import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { ResetPasswordUseCase } from "../reset-password-use-case";

export function makeResetPasswordUseCase() {
  return new ResetPasswordUseCase(makeAuthProvider());
}
