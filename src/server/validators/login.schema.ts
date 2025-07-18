import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["patient", "doctor", "admin"], {
    errorMap: () => ({ message: "Invalid role selected." }),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
