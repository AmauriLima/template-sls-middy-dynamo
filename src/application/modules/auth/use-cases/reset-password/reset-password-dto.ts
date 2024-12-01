import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string(),
  newPassword: z.string(),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
