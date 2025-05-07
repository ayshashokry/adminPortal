"use client";
import AuthLayout from "@/app/auth/AuthLayout";
import { maskEmail } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const OtpVerificationForm =dynamic(()=>import( "@components/forms/OtpVerificationForm"),{ssr:false});

export default function OtpPage() {
  const searchParams = useSearchParams();
    const { i18n } = useTranslation("translation");
  
  const [urlEmail, setUrlEmail] = useState("");
  useEffect(() => {
    if (searchParams) {
      const param = searchParams.get("email");
      if (param) setUrlEmail(param);
    }
  }, [searchParams]);

    return (
      <AuthLayout
      title="Two-Step Verification"
      headText="Please enter the OTP to verify your account. A code has been sent to your email:"
      checkEmail={maskEmail(urlEmail)}i18n={i18n}
    >
      <OtpVerificationForm urlEmail={urlEmail} /></AuthLayout>
  );
}
