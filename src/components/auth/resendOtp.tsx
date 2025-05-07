"use client";
import useAuth from "@/hooks/auth/usAuth";
import { emailSchema } from "@/utils/validtions/EmailSchema";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { otpInterface } from "@/hooks/auth/auth.interface";

const ResendOtp: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlEmail, setUrlEmail] = useState("");
  useEffect(() => {
    if (searchParams) {
      const param = searchParams.get("email");
      if (param) setUrlEmail(param);
    }
  }, [searchParams]);

  const { onSubmit } = useAuth<typeof emailSchema, otpInterface>({
    endPoint: "auth/admin/resend-otp",

    schema: emailSchema,
  });

  const onSubmitFunc = async () => {
    const updatedData = { email: urlEmail };
    const result = await onSubmit(updatedData);
    if (result?.data?.data) {
      router.push(`/auth/checkEmail?email=${urlEmail}`);
    }
  };
  const [isDisabled, setDisabled] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisabled(false);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <p className="mt-5 pt-5 text-gray text-sm">
      Didn’t receive the email?
      <button
        disabled={isDisabled}
        className={` font-semibold  ml-1 ${
          isDisabled
            ? "text-redDisabled cursor-not-allowed"
            : "text-red1 cursor-pointer"
        }`}
        onClick={onSubmitFunc}
      >
        Click to resend
      </button>
    </p>
  );
};

export default ResendOtp;
