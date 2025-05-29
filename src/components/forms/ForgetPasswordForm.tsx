"use client";

import CustomForm from "./CustomForm";
import { authInterface } from "@/hooks/auth/auth.interface";
import useAuth from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { emailSchema } from "@/utils/validtions/EmailSchema";
import { useState } from "react";
import { LockClosedIcon } from "@radix-ui/react-icons";
import MessageToaster from "../modals/MessageToaster";
import Loading from "../layout/Loading";
import { capitalizeString } from "@/utils/helpers";
import AuthLayout from "@/app/(unauth)/auth/AuthLayout";
import { forgetPassFields } from "@/data/formsFields";
// type ForgetPasswordFormValues = z.infer<typeof emailSchema>;

export default function ForgetPasswordForm() {
 
  const defaultValues = {
    email: "",
  };
  const router = useRouter();
  const [message, setMessage] = useState("");

  const { methods, error, onSubmit, isLoading } = useAuth<
    typeof emailSchema,
    authInterface
  >({
    endPoint: "auth/admin/forget-password",
    schema: emailSchema,
    defaultValues,
  });

  const onSubmitFunc = async (data: authInterface) => {
    const result = await onSubmit(data);
    if (result?.status == 200) {
      router.push(`/auth/checkEmail?email=${data.email}&forget=true`);
      setMessage(result?.data?.message);
    }
  };

  return (
    <AuthLayout
      // title={t("auth.forgetPassword")}
      // headText={`${t("auth.enter.please")} ${t("auth.enter.enter")} ${t(
      //   "auth.email"
      // )}`}
      // i18n={i18n}
      title="Forget Password"
      headText="Please enter your email"
    >
      {isLoading && <Loading />}
      {error && (
        <MessageToaster
          key={error?.data?.message}
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error?.data?.message}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}
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
      <CustomForm
        buttonTitle={capitalizeString("submit")}
        formType="forgetPassword"
        fields={[...forgetPassFields]}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
      />
    </AuthLayout>
  );
}
