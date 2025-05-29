import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { refreshTokenRequest } from "@/api/refreshToken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setAuth, logout, user } = useAuthStore.getState();
    if (error.response?.status === 419) {
      logout();
      setAuth(false, "", "", null, error.response?.data?.message);

      return Promise.reject(error);
    }
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-token")
    ) {
      originalRequest._retry = true;
      if (!refreshToken) {
        logout();
        setAuth(false, "", "");

        return Promise.reject(error);
      }
      try {
        const newTokens = await refreshTokenRequest();
        if (newTokens?.data?.authToken && newTokens?.data?.refreshToken) {
          setAuth(
            true,
            newTokens?.data?.authToken,
            newTokens?.data?.refreshToken,
            user
          );
          originalRequest.headers.Authorization = newTokens.data.authToken;
          return api(originalRequest);
        } else {
          logout();
          setAuth(false, "", "");

          return Promise.reject(error);
        }
      } catch (error) {
        logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const getParam = (
  param: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(param)) return param[0];
  if (typeof param === "string") return param;
  return undefined;
};
