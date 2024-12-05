import { AccountConfirmationSchemaType } from "@/application/modules/auth/use-cases/account-confirmation/account-confirmation-dto";
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { getSecretHash } from "./utils/get-secret-hash";

export async function cognitoAccountConfirmation(
  params: AccountConfirmationSchemaType,
  clientId: string,
  cognito: CognitoIdentityProviderClient,
): Promise<void> {
  const { code, email } = params;

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    SecretHash: getSecretHash(email),
    Username: email,
    ConfirmationCode: code,
  });

  await cognito.send(command);
}
