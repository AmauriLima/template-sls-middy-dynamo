import { ForgotPasswordSchemaType } from "@/application/modules/auth/use-cases/forgot-password/forgot-password-dto";
import { CognitoIdentityProviderClient, ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { getSecretHash } from "./utils/get-secret-hash";

export async function cognitoForgotPassword(
  params: ForgotPasswordSchemaType,
  clientId: string,
  cognito: CognitoIdentityProviderClient
): Promise<void> {
  const { email } = params;

  const command = new ForgotPasswordCommand({
    SecretHash: getSecretHash(email),
    ClientId: clientId,
    Username: email,
  });

  await cognito.send(command);
}
