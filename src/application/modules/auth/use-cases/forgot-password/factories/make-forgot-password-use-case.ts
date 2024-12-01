import { AwsCognitoAuthProvider } from "@/application/shared/providers/auth-provider/aws-cognito-auth-provider";
import { ForgotPasswordUseCase } from "../forgot-password-use-case";

export function makeForgotPasswordUseCase() {
  return new ForgotPasswordUseCase(new AwsCognitoAuthProvider());
}
