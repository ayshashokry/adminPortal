import { z } from "zod";

export const addUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please enter a valid email address"),
  adminRoleId: z.string().min(1, { message: "Role is required" }),
});
export const editUserSchema = z.object({
  ...addUserSchema.shape,
  status: z.string().min(1, { message: "Please choose a status" }),
  dateOfBirth: z.string().optional(),
  profileImageId: z.string().nullable().optional(),
  mobileNumber: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) =>
        value === null ||
        value === undefined ||
        value === "" ||
        /^5[0-9]{8}$/.test(value),
      { message: "Invalid mobile number" }
    ),
});

export const editProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please enter a valid email address"),
  mobileNumber: z.string().min(1, { message: "Mobile is required" }),
  profileImageId: z.string().optional(),
  dateOfBirth: z.string().optional(),
});
