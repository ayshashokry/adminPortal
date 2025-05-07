"use client";

import { ReactNode } from "react";
import I18nProvider from "@/utils/I18nProvider";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import PrivateRoute from "@components/auth/PrivateRoute";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Inter, Cairo } from "next/font/google";
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });
export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname.includes("login") ||
    pathname.includes("password") ||
    pathname.includes("otp") ||
    pathname.includes("checkEmail");
    const { i18n } = useTranslation();
    useEffect(() => {
      if (typeof window !== "undefined") {
        document.body.dir = i18n.language == "ar" ? "rtl" : "ltr";
        document.body.classList.add(
          i18n.language == "ar" ? cairo.className : inter.className
        );
      }
    }, [i18n.language]);
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <I18nProvider>
            {isAuthPage ? (
              children
            ) : (
              <PrivateRoute>
                {/* <InactivityTimer /> */}
                {children}
              </PrivateRoute>
            )}
          </I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
