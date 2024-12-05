import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { ForgotPasswordUseCase } from "../forgot-password-use-case";

export function makeForgotPasswordUseCase() {
  return new ForgotPasswordUseCase(makeAuthProvider());
}
