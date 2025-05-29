"use client";
import { maskEmail } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import {  useEffect, useState } from "react";
import OtpVerificationForm from "@components/forms/OtpVerificationForm"
import AuthLayout from "../AuthLayout";

export default function OtpPage() {
  const searchParams = useSearchParams();
  
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
      checkEmail={maskEmail(urlEmail)}
      // i18n={i18n}
    >
      <OtpVerificationForm urlEmail={urlEmail} /></AuthLayout>
  );
}
