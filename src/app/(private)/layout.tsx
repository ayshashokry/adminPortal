"use client";

import { ReactNode } from "react";
import QueryProvider from "@/app/providers/QueryProvider";
// import I18nProvider from "@/utils/I18nProvider";
import PrivateRoute from "@/components/auth/PrivateRoute";
// import DirectionSetter from "@/components/auth/DirectionSetter";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
      <PrivateRoute>{children}</PrivateRoute>
  );
}
