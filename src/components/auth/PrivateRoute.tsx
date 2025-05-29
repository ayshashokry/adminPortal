"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Loading from "@/components/layout/Loading";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hydrated, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else {
      setIsChecking(false);
    }
  }, [hydrated, isAuthenticated, pathname]);

  if (isChecking) return <Loading />;

  return <>{children}</>;
}
