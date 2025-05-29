"use client";
import { ValidateTokenRequest } from "@/api/validateToken";
import Loading from "@/components/layout/Loading";
import CreateNewPasswordForm from "@components/forms/CreateNewPassword";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "../AuthLayout";

export default function NewPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

 useEffect(() => {
  const checkTokenValidating = async () => {
    const currentToken = searchParams.get("token");
    console.log("Current token:", currentToken);

    if (!currentToken) return;

    setLoading(true);
    const result = await ValidateTokenRequest(currentToken);

    if (result?.data?.isAccessTokenValid === false) {
      router.replace("/auth/expired");
      return;
    }

    setIsTokenValid(true);
    setLoading(false);
  };

  checkTokenValidating();
}, [searchParams.toString()]);

  if (isLoading || isTokenValid === null) {
    return <Loading />;
  }

  return (
    <AuthLayout
      title="Create New Password"
      headText="Please enter the new password you need."
    >
      <CreateNewPasswordForm endPoint="auth/admin/set-password" />
    </AuthLayout>
  );
}
