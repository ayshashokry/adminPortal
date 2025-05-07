"use client";

import { loginSchema } from "@/utils/validtions/LoginSchema";
import CustomForm from "./CustomForm";
import { authInterface } from "@/hooks/auth/auth.interface";
import useAuthStore from "@/store/authStore";
import useAuth from "@/hooks/auth/usAuth";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { useEffect, useState } from "react";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import MessageToaster from "../modals/MessageToaster";
import Loading from "../layout/Loading";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/app/auth/AuthLayout";
import { flushSync } from "react-dom";
export default function LoginForm() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const { i18n, t } = useTranslation("translation");

  const defaultValues = {
    email: "",
    password: "",
  };
  const [message, setMessage] = useState("");
  const { methods, error, onSubmit, isLoading } = useAuth<
    typeof loginSchema,
    authInterface
  >({
    endPoint: "auth/admin/login",
    schema: loginSchema,
    defaultValues,
  });
  const [routeLoading, setRouteLoading] = useState(false);
  const onSubmitFunc = async (data: authInterface) => {
    setRouteLoading(true);
    const result = await onSubmit(data);
    if (result?.data?.data) {
      flushSync(() => {
        setAuth(
          result?.data?.data?.tokens.access,
          result?.data?.data?.user,
          result?.data?.data?.tokens?.refresh
        );
      });

      if (result?.data?.data?.isOtpGenerated) {
        router.push(`/auth/checkEmail?email=${data.email}`);
      } else {
        setTimeout(() => {
          setAuth(
            result?.data?.data?.tokens.refresh,
            result?.data?.data?.user,
            result?.data?.data?.tokens?.refresh
          );
        }, 5 * 60000);
        setTimeout(() => {
          setRouteLoading(false);
        }, 1);
        router.replace("/dashboard/user");

        setMessage(result?.data?.message);
      }
    } else {
      setRouteLoading(false);
    }
  };

  const [formFields] = useState([
    {
      id: 1,
      name: "email",
      label: _.capitalize("email"),
      placeholder: `Please enter your email`,
      type: "email",
      required: true,
      icon: <EnvelopeClosedIcon className="w-5 h-5" />,
    },
    {
      id: 2,
      name: "password",
      label: "Password",
      placeholder: `Please enter your password`,
      type: "password",
      required: true,
      icon: <LockClosedIcon className="w-5 h-5" />,
    },
  ]);
  const forgetPassword = (
    <div>
      <p
        className={`text-red mt-2 mb-5 cursor-pointer ${
          i18n.language == "ar"
            ? "text-left float-left"
            : "text-right float-right"
        } w-fit`}
        onClick={() => router.push("/auth/forget-password")}
      >
        {t("auth.forgetYourPass")}
      </p>
    </div>
  );
  useEffect(() => {
    console.log("loginError", error);
  }, [error]);

  return isLoading ? (
    <Loading />
  ) : (
    <AuthLayout
      title="Log In"
      headText='"Welcome back! Please enter your details.'i18n={i18n}
    >
      {" "}
      {error && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error?.data?.message}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}{" "}
      <CustomForm
        buttonTitle={_.capitalize("sign in")}
        formType="loginForm"
        fields={[...formFields]}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
        forgetPassword={forgetPassword}
      />
      {message && (
        <MessageToaster
          toastStyle="border-green bg-green1"
          title="Success!"
          description={message}
          isSucceed={true}
          imgBg="bg-green3"
          imgBorder="border-green2"
        />
      )}
    </AuthLayout>
  );
}
