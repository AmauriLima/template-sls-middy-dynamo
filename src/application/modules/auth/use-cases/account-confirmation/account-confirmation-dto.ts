import { z } from "zod";

export const AccountConfirmationSchema = z.object({
  email: z.string().email(),
  code: z.string(),
});

export type AccountConfirmationSchemaType = z.infer<typeof AccountConfirmationSchema>;
