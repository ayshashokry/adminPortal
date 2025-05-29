import axios from "axios";
import useAuthStore from "@/store/authStore";

export const refreshTokenRequest = async () => {
  const { refreshToken, logout, setAuth } = useAuthStore.getState();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Accept-Language": "en",
      "Content-Type": "application/json",
      Authorization: refreshToken,
    },
  });

  try {
    const result = await axiosInstance.get("/auth/refresh-token");
    return result?.data;
  } catch (error: any) {
    if (error?.status == 419) {
      logout();
      setAuth(false, "", "", null, error.response?.data?.message);
    }
    console.log("Refresh token failed", error);
  }
};
