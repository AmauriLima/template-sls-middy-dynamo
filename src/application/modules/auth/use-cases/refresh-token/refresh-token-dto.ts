import { z } from "zod";

export const RefreshTokenSchema = z.object({
  refresh_token: z.string(),
});

export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;
