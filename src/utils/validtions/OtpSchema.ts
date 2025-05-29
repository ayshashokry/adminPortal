import { z } from "zod";

export const otpSchema = z.object({
  otp: z.string().min(1, { message: "OTP is required" }).length(4,{message:'OTP must be 4 digits'}),
});
