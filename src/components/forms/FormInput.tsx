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
import _ from "lodash";
import ImageUploader from "../ui/imageUploader";

interface FormInputProps<T extends FieldValues> {
  field: {
    id: number;
    name: Path<T>; // Change this from keyof T to Path<T>
    label?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    icon?: React.ReactNode;
  };
  methods: UseFormReturn<T>;
  formType: string;
}

export default function FormInput<T extends FieldValues>({
  field,
  methods,
  formType,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={methods.control}
      name={field.name}
      render={({ field: controllerField }) => (
        <div>
          <FormItem
            className={`${
              formType === "editUserData"
                ? `grid grid-cols-3 gap-6 items-center ${field.type === "image" ? "items-start" : ""}`
                : ""
            }`}
          >
            {field.label && (
              <FormLabel
                className={`${
                  formType === "editUserData" ? "w-1/2 text-left" : ""
                }`}
              >
                {_.startCase(field.label)}
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
                  <ImageUploader key={field.id} />
                ) : (
                  <Input
                    {...controllerField}
                    className="pl-9"
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
