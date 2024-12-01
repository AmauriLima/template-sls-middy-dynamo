import { ForgotPasswordController } from "../forgot-password-controller";
import { makeForgotPasswordUseCase } from "./make-forgot-password-use-case";

export function makeForgotPasswordController() {
  return new ForgotPasswordController(makeForgotPasswordUseCase());
}
