import { z } from "zod";

export const passwordSchema = z.object({
  password: z
  .string()
  .min(1, { message: "Password is required." })
  .min(8, { message: "Invalid password format." })
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, { 
    message: "Invalid password format." 
  })
})