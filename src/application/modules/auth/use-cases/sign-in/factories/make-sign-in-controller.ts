import { SignInController } from "../sign-in-controller";
import { makeSignInUseCase } from "./make-sign-in-use-case";

export function makeSignInController() {
  return new SignInController(makeSignInUseCase());
}
