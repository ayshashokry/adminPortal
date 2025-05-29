"use client";
import useAuth from "@/hooks/auth/useAuth";
import { emailSchema } from "@/utils/validtions/EmailSchema";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { otpInterface } from "@/hooks/auth/auth.interface";
import MessageToaster from "../modals/MessageToaster";
import Loading from "../layout/Loading";

interface ResendProps {
  endPoint: string;
  content: string;
}
const ResendOtp: React.FC<ResendProps> = ({ endPoint, content }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlEmail, setUrlEmail] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    if (searchParams) {
      const param = searchParams.get("email");
      if (param) setUrlEmail(param);
    }
  }, [searchParams]);

  const { onSubmit, error, isLoading } = useAuth<
    typeof emailSchema,
    otpInterface
  >({
    endPoint: endPoint,
    schema: emailSchema,
  });
  const [message, setMessage] = useState("");
  const onSubmitFunc = async () => {
    const updatedData = { email: urlEmail };
    const result = await onSubmit(updatedData);
    if (result?.data) {
      setMessage(result?.data?.message);
      if (result?.data?.message.includes('reset')) {
        router.push(`/auth/checkEmail?email=${urlEmail}&forget=true`);
      } else {
        router.push(`/auth/checkEmail?email=${urlEmail}`);
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <p className="mt-5 pt-5 text-grayBasic text-sm">
        {content}{" "}
        <button
          // disabled={isDisabled}
          className={` font-semibold  ml-1 ${
            // isDisabled
            //   ? "text-redDisabled cursor-not-allowed"
            //   :
            "text-red1 cursor-pointer"
          }`}
          onClick={onSubmitFunc}
        >
          Click to resend
        </button>
      </p>
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
    </>
  );
};

export default ResendOtp;
