import { SignInSchemaType } from "@/application/modules/auth/use-cases/sign-in/sign-in-dto";
import { UnauthorizedHTTPError } from "@/application/shared/infra/http/errors/unauthorized-http-error";
import { AuthFlowType, CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { SignInResponse } from "../../auth-provider";
import { getSecretHash } from "./utils/get-secret-hash";

export async function cognitoSignIn(
  params: SignInSchemaType,
  clientId: string,
  cognito: CognitoIdentityProviderClient,
): Promise<SignInResponse> {
  const { email, password } = params;

  const command = new InitiateAuthCommand({
    ClientId: clientId,
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: getSecretHash(email),
    }
  });

  const { AuthenticationResult } = await cognito.send(command);

  if (!AuthenticationResult) {
    throw new UnauthorizedHTTPError({ message: 'Credenciais inválidas' });
  }

  return {
    accessToken: AuthenticationResult.AccessToken,
    refreshToken: AuthenticationResult.RefreshToken,
  }
}
