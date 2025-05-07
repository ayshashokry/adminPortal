"use client";
import AuthLayout from "@/app/auth/AuthLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ResendOtp from "@/components/auth/resendOtp";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CheckEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlEmail, setUrlEmail] = useState("");
  const { i18n } = useTranslation("translation");
  useEffect(() => {
    if (searchParams) {
      const param = searchParams.get("email");
      if (param) setUrlEmail(param);
    }
  }, [searchParams]);
  return (
    <AuthLayout
      title="Check your email"
      headText={`We sent a password reset link to`}
      checkEmail={urlEmail}i18n={i18n}
    >
      <div className="mt-5">
        <a
          href={`mailto:${urlEmail}`}
          className="bg-btnBlack rounded-lg text-white w-full py-3 text-center block"
          onClick={() => router.push(searchParams.get('forget')?`/auth/new-password`:`otp-verification?email=${urlEmail}`)}
        >
          Open Email
        </a>
      </div>
      <ResendOtp />
    </AuthLayout>
  );
}
