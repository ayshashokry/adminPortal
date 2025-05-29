"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { useState } from "react";
import ImageUploader from "../ui/imageUploader";
import { startCase } from "lodash";
import useAuthStore from "@/store/authStore";

interface FormInputProps<T extends FieldValues> {
  field: {
    id: number;
    name: Path<T>; // Change this from keyof T to Path<T>
    label?: string;
    placeholder?: string;
    type: string;
    required: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
  };
  methods: UseFormReturn<T>;
  formType: string;
  getImgValue?: (imgUUID: string) => void;
  profileDetails: any;
  detailsValues?: any;
}

export default function FormInput<T extends FieldValues>({
  field,
  methods,
  formType,
  getImgValue,
  profileDetails,
  detailsValues,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuthStore();

  return (
    <FormField
      control={methods.control}
      name={field.name}
      render={({ field: controllerField }) => (
        <div className={`${field?.fullWidth ? "col-span-2" : ""}`}>
          <FormItem
            className={`${
              formType === "editUserData"
                ? `grid grid-cols-3 gap-6 items-center ${
                    field.type === "image" ? "items-start" : ""
                  }`
                : ""
            }`}
          >
            {field.label && (
              <FormLabel
                className={`${
                  formType === "editUserData" ? "w-1/2 text-left" : ""
                }`}
              >
                {startCase(field.label)}
                {field.required && formType !== "editUserData" && (
                  <span className="text-red">*</span>
                )}
              </FormLabel>
            )}
            <FormControl
              className={`${
                formType === "editUserData" ? "justify-center" : ""
              }`}
            >
              <div className="relative">
                {field.icon && (
                  <span className="absolute left-3 top-2">{field.icon}</span>
                )}

                {field.type == "image" ? (
                  <ImageUploader
                    key={field.id}
                    field={field}
                    getImgValue={getImgValue}
                    imageValue={methods.getValues()?.profileImageId}
                  />
                ) : (
                  <Input
                    autoComplete={field.name}
                    disabled={
                      // (formType == "editUserData" ||
                      formType == "editItemForm" &&
                      // )
                      (user?.adminRoleName !== "Super Admin" ||
                        detailsValues?.adminRoleName == "Super Admin") &&
                      (field?.name == "mobileNumber" || field?.name == "email")
                    }
                    {...controllerField}
                    value={controllerField?.value || ""}
                    className={field.icon ? "pl-9" : ""}
                    placeholder={field.placeholder}
                    type={
                      showPassword && field.type === "password"
                        ? "text"
                        : field.type || "text"
                    }
                  />
                )}
                {field.type === "password" && (
                  <span
                    className="absolute right-3 top-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </span>
                )}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        </div>
      )}
    />
  );
}
