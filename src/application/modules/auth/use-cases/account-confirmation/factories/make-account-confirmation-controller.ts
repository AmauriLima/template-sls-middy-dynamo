import { AccountConfirmationController } from "../account-confirmation-controller";
import { makeAccountConfirmationUseCase } from "./make-account-confirmation-use-case";

export function makeAccountConfirmationController() {
  return new AccountConfirmationController(makeAccountConfirmationUseCase());
}
