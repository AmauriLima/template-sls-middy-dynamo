import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { SignUpUseCase } from "../sign-up-use-case";

export function makeSignUpUseCase() {
  return new SignUpUseCase(makeAuthProvider());
}
