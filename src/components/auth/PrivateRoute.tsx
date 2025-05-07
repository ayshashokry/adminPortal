"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Loading from "../layout/Loading";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token,refreshToken } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token === null) return;
    if (!token||!refreshToken) {
      router.replace("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [token, router]);

  if (isLoading) return <Loading/>;

  return <>{children}</>;
}
