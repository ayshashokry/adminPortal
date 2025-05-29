"use client";

import { loginSchema } from "@/utils/validtions/LoginSchema";
import CustomForm from "./CustomForm";
import { authInterface } from "@/hooks/auth/auth.interface";
import useAuthStore from "@/store/authStore";
import useAuth from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import MessageToaster from "../modals/MessageToaster";
import Loading from "../layout/Loading";
import { loginFormFields } from "@/data/formsFields";
import i18n from "@/lib/i18n";
import useFlashMessageStore from "@/store/useFlashMessageStore";
import AuthLayout from "@/app/(unauth)/auth/AuthLayout";
export default function LoginForm() {
  const { setAuth, hydrated, FouroneNineMessage } = useAuthStore();
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };
  // const [message, setMessage] = useState("");
  const { methods, error, onSubmit, isLoading, setLoading } = useAuth<
    typeof loginSchema,
    authInterface
  >({
    endPoint: "auth/admin/login",
    schema: loginSchema,
    defaultValues,
  });
  const onSubmitFunc = async (data: authInterface) => {
    const result = await onSubmit(data);
    const resultData = result?.data?.data;
    if (!resultData) return;
    if (resultData.isOtpGenerated) {
      router.push(`/auth/otp-verification?email=${data.email}`);
      return;
    } else {
      setAuth(
        true,
        resultData.tokens.access,
        resultData.tokens?.refresh,
        resultData.user
      );
      useFlashMessageStore.getState().setMessage(result?.data?.message);
      router.push("/dashboard/user");
    }
  };

  const forgetPassword = (
    <div>
      <p
        className={`text-red mt-2 mb-5 cursor-pointer w-full text-sm leading-relaxed ${
          i18n.language === "ar" ? "text-start" : "text-end"
        }`}
        onClick={() => router.push("/auth/forget-password")}
      >
        Forgot your password?
      </p>
    </div>
  );
  if (!hydrated) return null;
  return isLoading ? (
    <Loading />
  ) : (
    <AuthLayout
      title={"Log in"}
      headText={"Welcome back! Please enter your details."}
      // i18n={i18n}
    >
      {error && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error?.data?.message}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}
      {FouroneNineMessage && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={FouroneNineMessage}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}
      <CustomForm
        buttonTitle={"Sign In"}
        formType="loginForm"
        fields={[...loginFormFields]}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
        forgetPassword={forgetPassword}
      />
    </AuthLayout>
  );
}
