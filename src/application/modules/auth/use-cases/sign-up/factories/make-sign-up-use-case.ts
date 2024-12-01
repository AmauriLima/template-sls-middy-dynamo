import { AwsCognitoAuthProvider } from "@/application/shared/providers/auth-provider/aws-cognito-auth-provider";
import { SignUpUseCase } from "../sign-up-use-case";

export function makeSignUpUseCase() {
  return new SignUpUseCase(new AwsCognitoAuthProvider());
}
