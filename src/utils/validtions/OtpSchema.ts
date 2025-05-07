import { z } from "zod";


export const otpSchema = z.object({
  otp: z
  .string().min(1,'')
  .length(4, { message: "OTP must be exactly 4 digits." })
  // .regex(/^\d{4}$/, { message: "OTP must contain only numbers." }),
});


