"use client";
import CustomForm from "./CustomForm";
import { otpInterface } from "@/hooks/auth/auth.interface";
import useAuthStore from "@/store/authStore";
import useAuth from "@/hooks/auth/usAuth";
import { otpSchema } from "@/utils/validtions/OtpSchema";
import _ from "lodash";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MessageToaster from "../modals/MessageToaster";
import ResendOtp from "../auth/resendOtp";

export default function OtpVerificationForm({
  urlEmail,
}: {
  urlEmail: string;
}) {
  // const [otpExpired, setOtpExpired] = useState(false);
  // const [otpRecievedAt] = useState<number>(Date.now());
  const [otpValue, setOtp] = useState<string>();
  const [message, setMessage] = useState("");

  const { setAuth } = useAuthStore();
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOtpExpired(true);
  //   }, OTP_EXPIRY_TIME);

  //   return () => clearTimeout(timer);
  // }, []);
  const defaultValues = {
    email: "",
    otp: "",
  };

  const { methods, error, onSubmit } = useAuth<typeof otpSchema, otpInterface>({
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
        result?.data?.data?.tokens.access,
        result?.data?.data?.user,
        result?.data?.data?.tokens?.refresh
      );
      setTimeout(() => {
        setAuth(
          result?.data?.data?.tokens.refresh,
          result?.data?.data?.user,
          result?.data?.data?.tokens?.refresh
        );
      }, 5 * 60000);
      router.push("/dashboard/user");
      setMessage(result?.data?.message);
    }
  };
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  return (
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
        buttonTitle={_.capitalize("Verify")}
        formType="otpVerify"
        fields={[...formFields]}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
        otpValue={otpValue}
        setOtpValue={handleOtpChange}
      />
      <ResendOtp />
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
