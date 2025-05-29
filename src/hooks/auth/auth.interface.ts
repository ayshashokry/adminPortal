import { statusesInterface } from "@/components/dashboard/dashboard.interface";
import { ReactNode } from "react";

export interface authInterface {
  email: string;
  password?: string;
}

export interface ForgetPassInterface {
  email: string;
}

export interface otpInterface {
  otp?: string;
  email: string;
}
export interface confirmChecksInterface {
  id: number;
  name: string;
  checked: boolean;
  regex: RegExp;
}

export interface newPasswordInterface {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

type InputType = "email" | "password" | "text" | "select" | "image" | "date"|"map"|'number';
export interface FormFieldInterface {
  id: number;
  name: string;
  label: string;
  placeholder?: string;
  type: InputType;
  required: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  endPoint?: string;
  labelKey?: string;
  valueKey?: string;
  selectData?: statusesInterface[];
}
