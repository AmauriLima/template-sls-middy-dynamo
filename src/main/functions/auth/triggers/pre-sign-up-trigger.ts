import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { PreSignUpTriggerEvent } from "aws-lambda";

export async function handler(event: PreSignUpTriggerEvent) {
  if (event.triggerSource === 'PreSignUp_ExternalProvider') {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
  } else {
    return event;
  }

  const { userPoolId, userName } = event;
  const { email, given_name, family_name } = event.request.userAttributes;

  const cognitoAuthProvider = makeAuthProvider();

  let nativeUserId = await cognitoAuthProvider.getUserByEmail({ email, userPoolId });

  if (!nativeUserId) {
    nativeUserId = await cognitoAuthProvider.createUser({ email,
      familyName: given_name,
      givenName: family_name,
      userPoolId
    });
  }

  const [providerName, providerUserId] = userName.split('_');

  await cognitoAuthProvider.linkProvider({
    userPoolId,
    nativeUserId,
    providerName,
    providerUserId,
  });

  return event;
}
