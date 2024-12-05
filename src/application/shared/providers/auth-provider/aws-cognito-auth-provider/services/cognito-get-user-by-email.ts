import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { GetUserByEmailParams } from "../../auth-provider";

export async function cognitoGetUserByEmail(
  params: GetUserByEmailParams,
  cognito: CognitoIdentityProviderClient
): Promise<string | undefined> {
  const { email, userPoolId, paginationToken } = params;

  const command = new ListUsersCommand({
    UserPoolId: userPoolId,
    AttributesToGet: ['sub'],
    Filter: `email = "${email}"`,
    Limit: 1,
    PaginationToken: paginationToken
  });

  const {
    PaginationToken,
    Users = []
  } = await cognito.send(command);

  const [user] = Users;

  if (user) {
    const userId = user.Attributes?.find(({ Name }) => Name === 'sub')?.Value;

    if (!userId) {
      throw new Error('Failed while trying to create native user');
    }

    return userId;
  }

  if (paginationToken) {
    cognitoGetUserByEmail({ email, userPoolId, paginationToken: PaginationToken }, cognito)
  }
}
