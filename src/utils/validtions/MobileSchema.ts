import { z } from "zod";


export const mobileSchema = z.object({
  mobile: z
    .string({ message: "Name is required" })
    .min(3, "Name should be at least 3 characters"),
});


