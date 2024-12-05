import { AdminLinkProviderForUserCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { LinkProviderParams } from "../../auth-provider";

export async function cognitoLinkProvider(params: LinkProviderParams, cognito: CognitoIdentityProviderClient): Promise<void> {
  const { nativeUserId, providerName, providerUserId, userPoolId } = params;

  const command = new AdminLinkProviderForUserCommand({
    UserPoolId: userPoolId,
    DestinationUser: {
      ProviderName: 'Cognito',
      ProviderAttributeValue: nativeUserId
    },
    SourceUser: {
      ProviderName: providerName,
      ProviderAttributeValue: providerUserId,
      ProviderAttributeName: 'Cognito_Subject',
    },
  });

  await cognito.send(command);
}
