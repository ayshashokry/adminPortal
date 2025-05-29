"use client";

import {
  newPassSchema,
  newProfilePassSchema,
} from "@/utils/validtions/NewPassSchema";
import CustomForm from "./CustomForm";
import {
  confirmChecksInterface,
  newPasswordInterface,
} from "@/hooks/auth/auth.interface";
import useAuth from "@/hooks/auth/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SuccessModal from "@components/modals/SuccessModal";
import { LockClosedIcon } from "@radix-ui/react-icons";
import MessageToaster from "../modals/MessageToaster";
import { capitalizeString } from "@/utils/helpers";
import Loading from "../layout/Loading";
import useAuthStore from "@/store/authStore";
import { profileSetPassFields, unAuthSetPassFields } from "@/data/formsFields";
interface createNewPassProps {
  profileSetPass?: boolean;
  endPoint: string;
}
export default function CreateNewPasswordForm({
  profileSetPass = false,
  endPoint,
}: createNewPassProps) {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  // if (!token) return null;
  const schema = profileSetPass ? newProfilePassSchema : newPassSchema;

  const { onSubmit, methods, error, isLoading } = useAuth<
    typeof schema,
    newPasswordInterface
  >({
    endPoint: endPoint,
    schema: profileSetPass ? newProfilePassSchema : newPassSchema,
    defaultValues,
    token,
  });
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isOpen, setIsopen] = useState(false);
  const { logout } = useAuthStore();
  const openSuccessModal = () => {
    setIsopen(true);
  };
  const onSubmitFunc = async (data: newPasswordInterface) => {
    const result = await onSubmit(data);
    if (result?.data) {
      setMessage(result?.data?.message);
      openSuccessModal();
      if (!profileSetPass) {
        logout();
      }
      setTimeout(() => {
        router.push(profileSetPass ? "/dashboard/user" : "/auth/login");
      }, 2000);
    }
  };

  const [confirmChecks] = useState<confirmChecksInterface[]>([
    {
      id: 1,
      name: "Uppercase characters.",
      checked: false,
      regex: /[A-Z]/,
    },
    {
      id: 2,
      name: "Lowercase characters.",
      checked: false,
      regex: /[a-z]/,
    },
    {
      id: 3,
      name: "Numbers characters.",
      checked: false,
      regex: /\d/,
    },
    {
      id: 4,
      name: "8 Character minimum.",
      checked: false,
      regex: /.{8,}/,
    },
  ]);

  const onCloseModal = () => {
    setIsopen(false);
    router.push(profileSetPass ? "/dashboard/user" : "/auth/login");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {!profileSetPass && isOpen && (
        <SuccessModal
          isOpen={isOpen}
          onClose={onCloseModal}
          title="Congratulations!"
          content="Your Password Reseting Successfully"
        />
      )}
      <CustomForm
        openSuccessModal={openSuccessModal}
        buttonTitle={capitalizeString("confirm")}
        formType={profileSetPass ? "profileSetPass" : "createNewPass"}
        fields={
          profileSetPass ? [...profileSetPassFields] : [...unAuthSetPassFields]
        }
        onSubmitFunc={onSubmitFunc}
        methods={methods}
        confirmChecks={confirmChecks}
      />
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
      {message && profileSetPass && (
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
