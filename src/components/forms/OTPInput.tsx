"use client";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@ui/input-otp";

interface OTPInputProps {
  field: any;
  otpValue?: string;
  setOtpValue?: (otp: string) => void;
  methods: any;
}

export default function OTPInput({ field, otpValue, setOtpValue, methods }: OTPInputProps) {
  return (
    <InputOTP maxLength={4} value={otpValue || ""} onChange={(value) => {
      if (/^\d*$/.test(value)) {
        setOtpValue?.(value);
        methods.setValue(field.name, value);
      }
    }}>
      <InputOTPGroup className="flex gap-x-3 w-full">
        {[...Array(4)].map((_, index) => (
          <InputOTPSlot key={index} id={`otp-${index}`} index={index} className="w-[100%] h-12 text-center border" />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}