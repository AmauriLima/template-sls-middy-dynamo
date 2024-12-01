import { AwsCognitoAuthProvider } from "@/application/shared/providers/auth-provider/aws-cognito-auth-provider";
import { SignInUseCase } from "../sign-in-use-case";

export function makeSignInUseCase() {
  return new SignInUseCase(new AwsCognitoAuthProvider());
}
