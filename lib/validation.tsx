import { z } from "zod";

export const UserFormvalidation = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters.")
    .max(40, "Name must not exceed 40 characters"),
  email: z.string().email("Inavlid Email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Inavlid Phone number"),
});
