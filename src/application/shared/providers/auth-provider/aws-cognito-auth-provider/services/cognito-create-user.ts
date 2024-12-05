import { AdminCreateUserCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { CreateUserParams } from "../../auth-provider";

export async function cognitoCreateUser(
  params: CreateUserParams,
  cognito: CognitoIdentityProviderClient
): Promise<string> {
  const { email, familyName, givenName, userPoolId } = params;

  const command = new AdminCreateUserCommand({
    UserPoolId: userPoolId,
    Username: email,
    MessageAction: 'SUPPRESS',
    UserAttributes: [
      { Name: 'given_name', Value: givenName },
      { Name: 'family_name', Value: familyName },
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'true' },
    ]
  });

  const { User } = await cognito.send(command);

  if (!User) {
    throw new Error('Failed while trying to create native user');
  }

  const userId = User.Attributes?.find(({ Name }) => Name === 'sub')?.Value;

  if (!userId) {
    throw new Error('Failed while trying to create native user');
  }

  return userId;
}
