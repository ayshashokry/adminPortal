import Image from "next/image";
import React, { ReactNode } from "react";
// import { Globe } from "lucide-react";
import i18n from "@/lib/i18n";
import AuthImage from "@/components/auth/AuthImage";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  headText: string;
  checkEmail?: string;
  // i18n: { language: string; changeLanguage: (lang: string) => void };
}

function AuthLayout({
  children,
  title,
  headText,
  checkEmail,
}: // i18n,
AuthLayoutProps) {
  return (
    <div className="grid grid-cols-12 gap-4 w-full min-h-screen py-4">
      {/* Language toggle */}
      {/* <Globe
        onClick={() => i18n.changeLanguage(i18n.language == "en" ? "ar" : "en")}
        className="cursor-pointer absolute right-2 top-2 z-50"
      /> */}

      {/* Left Side - Optimized Image */}
      <AuthImage />

      {/* Right Side - Form Content */}
      <div className="w-full col-span-12 lg:col-span-7 flex flex-col justify-center px-2 lg:px-20">
        <div>
          <div
            className="lcp-container"
            style={{ paddingBottom: "1.25rem", marginBottom: "1rem" }}
          >
            <Image
              src="/images/SalesFine.webp"
              alt="Logo"
              width={195}
              height={52}
              className="pb-5 mb-4"
              priority
            />
          </div>
          <h1 className="text-4xl font-semibold pt-6 pb-2 leading-snug tracking-tight min-h-[44px]">
            {title}
          </h1>

          <p className="pt-1 text-grayBasic pb-2 text-base leading-relaxed min-h-[24px]">
            {headText}
            {checkEmail && <span className="font-semibold"> {checkEmail}</span>}
          </p>
          <div className="w-full lg:w-4/5">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AuthLayout);
