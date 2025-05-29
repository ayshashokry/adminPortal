"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Loading from "@/components/layout/Loading";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { hydrated, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!hydrated) return;
    const loginPage = pathname.includes("auth/login");

    if (isAuthenticated && loginPage) {
      router.replace("/dashboard/user");
    } else {
      setIsChecking(false);
    }
  }, [hydrated, isAuthenticated, pathname]);
  if (isChecking) return <Loading />;

  return children
}
