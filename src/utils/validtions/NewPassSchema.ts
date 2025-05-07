import { z } from "zod";
import { passwordSchema } from "./PasswordSchema";

export const newPassSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Invalid password format." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
        message: "Invalid password format.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
