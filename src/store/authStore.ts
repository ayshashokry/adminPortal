import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  email: string;
  id: string;
  roles: string[];
  name: string;
  adminRoleName: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (
    isAuthenticated: boolean,
    token: string,
    refreshToken: string,
    user?: User | null,
    FouroneNineMessage?: string | null
  ) => void;
  logout: () => void;
  refreshToken: string | null;
  hydrated: boolean;
  FouroneNineMessage?: string | null;
};

let store: any;

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      store = { set, get };

      return {
        token: null,
        user: null,
        isAuthenticated: false,
        refreshToken: null,
        hydrated: false,
        FouroneNineMessage: null,
        setAuth: (
          isAuthenticated,
          token,
          refreshToken,
          user,
          FouroneNineMessage
        ) =>
          set({
            token,
            user,
            isAuthenticated,
            refreshToken,
            FouroneNineMessage,
          }),

        logout: () =>
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            refreshToken: null,
          }),
      };
    },
    {
      name: "auth-storage",
      onRehydrateStorage: () => {
        return () => {
          if (store?.set) {
            store.set({ hydrated: true });
          }
        };
      },
    }
  )
);

export default useAuthStore;
