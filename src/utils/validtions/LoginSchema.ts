import { z } from "zod";
import  {emailSchema} from "./EmailSchema";
import { passwordSchema } from "./PasswordSchema";

export const loginSchema = z.object({
  ...emailSchema.shape,
  ...passwordSchema.shape,
});
