"use client";

import { newPassSchema } from "@/utils/validtions/NewPassSchema";
import CustomForm from "./CustomForm";
import {
  authInterface,
  confirmChecksInterface,
  newPasswordInterface,
} from "@/hooks/auth/auth.interface";
import useAuth from "@hooks/auth/usAuth";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { useState } from "react";
import SuccessModal from "@components/modals/SuccessModal";
import { LockClosedIcon } from "@radix-ui/react-icons";
import AuthLayout from "@/app/auth/AuthLayout";
import { useTranslation } from "react-i18next";
// type NewPasswordsFormValues = z.infer<typeof newPassSchema>;
interface createNewPassProps {
  profileSetPass?: boolean;
}
export default function CreateNewPasswordForm({
  profileSetPass = false,
}: createNewPassProps) {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { onSubmit, methods } = useAuth<typeof newPassSchema, newPasswordInterface>({
    endPoint: "auth/admin/set-password",
    schema: newPassSchema,
    defaultValues,
  });
  const router = useRouter();
  const onSubmitFunc = async (data: newPasswordInterface) => {
    console.log('DDDataaarrrr',data)
    const result = await onSubmit(data);
    console.log("NEWPASSRESULT", result);
  };
  const formFields = profileSetPass
    ? [
        {
          id: 1,
          name: "oldPassword",
          label: "old password",
          placeholder: `Please enter your old password`,
          type: "password",
          required: true,
          icon: <LockClosedIcon className="w-5 h-5" />,
        },
        {
          id: 2,
          name: "newPassword",
          label: "auth.New Password",
          placeholder: `Please enter yout new password`,
          type: "password",
          required: true,
          icon: <LockClosedIcon className="w-5 h-5" />,
        },
        {
          id: 3,
          name: "confirmPassword",
          label: "Confirm Password",
          placeholder: `Please enter confirm password`,
          type: "password",
          required: true,
          icon: <LockClosedIcon className="w-5 h-5" />,
        },
      ]
    : [
        {
          id: 1,
          name: "newPassword",
          label: "Password",
          placeholder: `Please enter your password`,
          type: "password",
          required: true,
          icon: <LockClosedIcon className="w-5 h-5" />,
        },
        {
          id: 2,
          name: "confirmPassword",
          label: "Rewrite Password",
          placeholder: `Please Rewrite Password`,
          type: "password",
          required: true,
          icon: <LockClosedIcon className="w-5 h-5" />,
        },
      ];

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
  const [isOpen, setIsopen] = useState(false);
  const onCloseModal = () => {
    setIsopen(false);
    router.push("/dashboard/merchants");
  };
  const openSuccessModal = () => {
    setIsopen(true);
  };
    const { i18n } = useTranslation("translation");
  
  return (
    <AuthLayout
      title="Create New Password"
      headText="Please enter the new password you need."i18n={i18n}
    >
      {/* {!profileSetPass && isOpen && (
        <SuccessModal
          isOpen={isOpen}
          onClose={onCloseModal}
          title="Password Changed Congratulations!"
          content="Your Password Reseting Successfully"
        />
      )} */}
      <CustomForm
        openSuccessModal={openSuccessModal}
        buttonTitle={_.capitalize("confirm")}
        formType={profileSetPass ? "profileSetPass" : "createNewPass"}
        fields={[...formFields]}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
        confirmChecks={confirmChecks}
      />
    </AuthLayout>
  );
}
