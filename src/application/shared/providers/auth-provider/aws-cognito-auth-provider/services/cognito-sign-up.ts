import { SignUpSchemaType } from "@/application/modules/auth/use-cases/sign-up/sign-up-dto";
import { InternalServerHTTPError } from "@/application/shared/infra/http/errors/internal-server-http-error";

import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { SignUpResponse } from "../../auth-provider";
import { getSecretHash } from "./utils/get-secret-hash";

export async function cognitoSignUp(
  params: SignUpSchemaType,
  clientId: string,
  cognito: CognitoIdentityProviderClient,
): Promise<SignUpResponse> {
  const { email, family_name, given_name, password } = params;

  const command = new SignUpCommand({
    ClientId: clientId,
    SecretHash: getSecretHash(email),
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'given_name', Value: given_name },
      { Name: 'family_name', Value: family_name },
    ],
  });

  const { UserSub } = await cognito.send(command);

  if (!UserSub) {
    throw new InternalServerHTTPError({
      message: 'Ocorreu um erro ao registrar o usuário no cognito',
    });
  }

  return {
    userId: UserSub
  }
}
