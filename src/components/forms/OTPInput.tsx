"use client";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@ui/input-otp";
import { FormControl, FormField, FormItem } from "../ui/form";

interface OTPInputProps {
  field: any;
  otpValue?: string;
  setOtpValue?: (otp: string) => void;
  methods: any;
}
export default function OTPInput({
  field,
  otpValue,
  setOtpValue,
  methods,
}: OTPInputProps) {

  return (
    <FormField
      control={methods.control}
      name={field.name}
      render={({ field: controllerField }) => (
        <FormItem>
          <FormControl>
            <InputOTP                     {...controllerField}

              maxLength={4}
              value={otpValue || ""}
              onChange={(value) => {
                if (/^\d*$/.test(value)) {
                  setOtpValue?.(value);
                  methods.setValue(field.name, value);
                }
              }}
            >
              <InputOTPGroup className="flex gap-x-3 w-full">
                {[...Array(4)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    id={`otp-${index}`}
                    index={index}
                    className="w-[100%] h-12 text-center border"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <p className="text-red5 text-[0.8rem] font-medium text-destructive">{methods?.formState?.errors?.otp?.message}</p>
        </FormItem>
      )}
    />
  );
}
