import { NotFoundHTTPError } from "@/application/shared/infra/http/errors/not-found-http-error";
import { AdminGetUserCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { GetUserParams, GetUserResponse, Profile } from "../../auth-provider";

export async function cognitoGetUser(
  params: GetUserParams,
  poolId: string,
  cognito: CognitoIdentityProviderClient
): Promise<GetUserResponse> {
  const { userId } = params;

  const command = new AdminGetUserCommand({
    Username: userId,
    UserPoolId: poolId,
  });

  const { UserAttributes } = await cognito.send(command);

  if (!UserAttributes) {
    throw new NotFoundHTTPError({
       message: 'Usuário não encontrado'
    });
  }

  const profile = UserAttributes.reduce((profileObj, { Name, Value }) => ({
    ...profileObj,
    [String(Name)]: Value
  }), {} as Profile);

  return {
    profile: {
      id: profile.sub,
      email: profile.email,
      emailVerified: profile.email_verified,
      givenName: profile.given_name,
      familyName: profile.family_name,
    }
  };
}
