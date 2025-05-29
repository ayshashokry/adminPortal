"use client";

import { FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import FormInput from "./FormInput";
import OTPInput from "./OTPInput";
import PasswordChecklist from "./PasswordChecklist";
import FormActions from "./FormActions";
import { confirmChecksInterface } from "@/hooks/auth/auth.interface";
import FormSelect from "./FormSelect";
import { statusesInterface } from "../dashboard/dashboard.interface";

interface InputField<T> {
  id: number;
  name: Extract<keyof T, string>;
  label?: string;
  placeholder?: string;
  type: string;
  required: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  endPoint?: string;
  labelKey?: string;
  valueKey?: string;
  selectData?: statusesInterface[];
}

interface CustomFormProps<T extends z.ZodType<any, any>> {
  fields: InputField<z.infer<T>>[];
  onSubmitFunc: SubmitHandler<z.infer<T>>;
  formType: string;
  buttonTitle: string;
  methods: any;
  forgetPassword?: React.ReactNode;
  otpValue?: string;
  setOtpValue?: (otp: string) => void;
  openSuccessModal?: () => void;
  confirmChecks?: confirmChecksInterface[];
  editProfilePass?: React.ReactNode;
  getImgValue?: (imgUUID: string) => void;
  profileDetails?: any;
  buttonDisabled?: boolean;
  detailsValues?: any;
}

export default function CustomForm<T extends z.ZodType<any, any>>({
  fields,
  onSubmitFunc,
  formType,
  buttonTitle,
  methods,
  forgetPassword,
  otpValue,
  setOtpValue,
  confirmChecks,
  openSuccessModal,
  editProfilePass,
  getImgValue,
  profileDetails,
  buttonDisabled,
  detailsValues,
}: CustomFormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitFunc)} className="space-y-4">
        <div
          className={`${
            formType == "addItemForm" || formType == "editItemForm"
              ? "grid grid-cols-2 gap-4"
              : ""
          }`}
        >
          {fields.map((field) =>
            field.type === "otp" ? (
              <OTPInput
                key={field.id}
                field={field}
                otpValue={otpValue}
                setOtpValue={setOtpValue}
                methods={methods}
              />
            ) : field.type == "select" ? (
              <FormSelect
                key={field.id}
                field={field}
                methods={methods}
                formType={formType}
              />
            ) : (
              <FormInput
                key={field.id}
                field={field}
                methods={methods}
                formType={formType}
                getImgValue={getImgValue}
                profileDetails={profileDetails}
                detailsValues={detailsValues}
              />
            )
          )}

          {(formType === "createNewPass" || formType === "profileSetPass") && (
            <PasswordChecklist
              confirmChecks={confirmChecks}
              methods={methods}
            />
          )}

          {editProfilePass}
          {formType === "loginForm" && forgetPassword}
        </div>

        <FormActions
          formType={formType}
          buttonTitle={buttonTitle}
          openSuccessModal={openSuccessModal}
          buttonDisabled={buttonDisabled}
        />
      </form>
    </FormProvider>
  );
}
