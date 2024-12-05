import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { AccountConfirmationUseCase } from "../account-confirmation-use-case";

export function makeAccountConfirmationUseCase() {
  return new AccountConfirmationUseCase(makeAuthProvider());
}
