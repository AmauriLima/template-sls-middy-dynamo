import { ResetPasswordSchemaType } from "@/application/modules/auth/use-cases/reset-password/reset-password-dto";
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { getSecretHash } from "./utils/get-secret-hash";

export async function cognitoResetPassword(
  params: ResetPasswordSchemaType,
  clientId: string,
  cognito: CognitoIdentityProviderClient
): Promise<void> {
  const { email, code, newPassword } = params;

  const command = new ConfirmForgotPasswordCommand({
    ClientId: clientId,
    SecretHash: getSecretHash(email),
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  });

  await cognito.send(command);
}
