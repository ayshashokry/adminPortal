"use client";
import CustomForm from "./CustomForm";
import { otpInterface } from "@/hooks/auth/auth.interface";
import useAuthStore from "@/store/authStore";
import useAuth from "@/hooks/auth/useAuth";
import { otpSchema } from "@/utils/validtions/OtpSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MessageToaster from "../modals/MessageToaster";
import ResendOtp from "../auth/resendOtp";
import { capitalizeString } from "@/utils/helpers";
import Loading from "../layout/Loading";

export default function OtpVerificationForm({
  urlEmail,
}: {
  urlEmail: string;
}) {
  const [otpValue, setOtp] = useState<string>();
  const [message, setMessage] = useState("");

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const defaultValues = {
    otp: "",
  };

  const { methods, error, onSubmit, isLoading } = useAuth<
    typeof otpSchema,
    otpInterface
  >({
    endPoint: "auth/admin/verify-otp",
    schema: otpSchema,
    defaultValues,
  });
  const [formFields] = useState([
    {
      id: 1,
      name: "otp",
      type: "otp",
      required: true,
    },
  ]);
  const onSubmitFunc = async (data: otpInterface) => {
    const updatedData = { ...data, email: urlEmail };
    const result = await onSubmit(updatedData);
    if (result?.data?.data) {
      setAuth(
        true,
        result?.data?.data?.tokens.access,
        result?.data?.data?.tokens?.refresh,
        result?.data?.data?.user
      );

      router.push("/dashboard/user");
      setMessage(result?.data?.message);
    }
  };
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
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
      <CustomForm
        buttonTitle={capitalizeString("Verify")}
        formType="otpVerify"
        fields={[...formFields]}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
        otpValue={otpValue}
        setOtpValue={handleOtpChange}
      />
      <ResendOtp
        content="Didn’t receive an email or OTP expired ? Click to resend"
        endPoint="auth/admin/resend-otp"
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
    </>
  );
}
