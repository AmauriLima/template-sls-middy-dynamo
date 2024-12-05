import { RefreshTokenSchemaType } from "@/application/modules/auth/use-cases/refresh-token/refresh-token-dto";
import { UnauthorizedHTTPError } from "@/application/shared/infra/http/errors/unauthorized-http-error";
import { AuthFlowType, CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { RefreshTokenResponse } from "../../auth-provider";

export async function cognitoRefreshToken(
  params: RefreshTokenSchemaType,
  clientId: string,
  cognito: CognitoIdentityProviderClient,
): Promise<RefreshTokenResponse> {
  const { refresh_token } = params;

  const command = new InitiateAuthCommand({
    ClientId: clientId,
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    AuthParameters: {
      REFRESH_TOKEN: refresh_token,
    }
  });

  const { AuthenticationResult } = await cognito.send(command);

  if (!AuthenticationResult) {
    throw new UnauthorizedHTTPError({ message: 'Credenciais inválidas' });
  }

  return {
    accessToken: AuthenticationResult.AccessToken,
    refreshToken: refresh_token,
  }
}
