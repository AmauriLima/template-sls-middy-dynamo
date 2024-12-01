import { AwsCognitoAuthProvider } from "@/application/shared/providers/auth-provider/aws-cognito-auth-provider";
import { ResetPasswordUseCase } from "../reset-password-use-case";

export function makeResetPasswordUseCase() {
  return new ResetPasswordUseCase(new AwsCognitoAuthProvider());
}
