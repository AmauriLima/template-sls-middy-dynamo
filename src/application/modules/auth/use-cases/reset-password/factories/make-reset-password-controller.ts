
import { ResetPasswordController } from "../reset-password-controller";
import { makeResetPasswordUseCase } from "./make-reset-password-use-case";

export function makeResetPasswordController() {
  return new ResetPasswordController(makeResetPasswordUseCase());
}
