import { z } from "zod";

export const contactSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email().min(1, "At least one email is required"),
  phoneNumber: z.string().min(1, "At least one phone number is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
