"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ResendOtp from "@/components/auth/resendOtp";
import { Button } from "@/components/ui/button";
import AuthLayout from "../AuthLayout";

export default function CheckEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlEmail = searchParams.get("email");
  const isForget = searchParams.get("forget");
  return (
    <AuthLayout
      title="Check your email"
      headText={`We sent a password reset link to`}
      checkEmail={urlEmail || ""}
      // i18n={i18n}
    >
      <div className="mt-5">
        <Button
          onClick={() =>
            window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")
          }
          className="bg-btnBlack rounded-lg text-white w-full text-center block"
        >
          Open Email
        </Button>
      </div>
      <ResendOtp
        content="Didn’t receive the email?"
        endPoint={
          isForget ? "auth/admin/forget-password" : "auth/admin/resend-otp"
        }
      />
    </AuthLayout>
  );
}
