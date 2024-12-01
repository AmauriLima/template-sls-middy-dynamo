import { RefreshTokenController } from "../refresh-token-controller";
import { makeRefreshTokenUseCase } from "./make-refresh-token-use-case";

export function makeRefreshTokenController() {
  return new RefreshTokenController(makeRefreshTokenUseCase());
}
