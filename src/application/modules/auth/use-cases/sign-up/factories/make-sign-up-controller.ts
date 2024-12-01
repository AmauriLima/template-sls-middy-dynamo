import { SignUpController } from "../sign-up-controller";
import { makeSignUpUseCase } from "./make-sign-up-use-case";

export function makeSignUpController() {
  return new SignUpController(makeSignUpUseCase());
}
