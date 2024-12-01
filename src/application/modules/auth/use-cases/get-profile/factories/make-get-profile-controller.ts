import { GetProfileController } from "../get-profile-controller";
import { makeGetProfileUseCase } from "./make-get-profile-use-case";

export function makeGetProfileController() {
  return new GetProfileController(makeGetProfileUseCase());
}
