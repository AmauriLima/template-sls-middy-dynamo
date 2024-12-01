import { env } from "@/application/config/env";
import { createHmac } from 'node:crypto';

export function getSecretHash(username: string) {
  const clientId = env.COGNITO_CLIENT_ID;
  const clientSecret = env.COGNITO_CLIENT_SECRET;

  return createHmac('SHA256', clientSecret)
    .update(`${username}${clientId}`)
    .digest('base64');
}
