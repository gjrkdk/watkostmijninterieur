import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
});

export const multiStepFormSchema = z.object({
  rooms: z
    .array(
      z.object({
        isSelected: z.boolean(),
      }),
    )
    .refine((rooms) => rooms.some((room) => room.isSelected), {
      message: "At least one room must be selected",
      path: ["rooms"],
    }),
});
