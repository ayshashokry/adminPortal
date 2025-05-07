import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
  email: string;
  id: string;
  roles: string[];
  name: string;
};
type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User, refreshToken: string) => void;
  logout: () => void;
  refreshToken: string | null;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      refreshToken: null,

      setAuth: (token, user, refreshToken) =>
        set({ token, user, isAuthenticated: true, refreshToken }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-storage", // Name in Local Storage
    }
  )
);

export default useAuthStore;
