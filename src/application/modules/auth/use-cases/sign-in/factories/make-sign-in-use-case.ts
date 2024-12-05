import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { SignInUseCase } from "../sign-in-use-case";

export function makeSignInUseCase() {
  return new SignInUseCase(makeAuthProvider());
}
