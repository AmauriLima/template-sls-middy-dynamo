import { AwsCognitoAuthProvider } from "@/application/shared/providers/auth-provider/aws-cognito-auth-provider";
import { AccountConfirmationUseCase } from "../account-confirmation-use-case";

export function makeAccountConfirmationUseCase() {
  return new AccountConfirmationUseCase(new AwsCognitoAuthProvider());
}
