import { z } from "zod";

export const exchangeCodeSchema = z.object({
  code: z.string().min(1),
  redirect_uri: z.string().min(1),
});


export type ExchangeCodeSchemaType = z.infer<typeof exchangeCodeSchema>;
