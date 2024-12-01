import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  given_name: z.string(),
  family_name: z.string(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
