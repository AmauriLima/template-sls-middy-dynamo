import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { RefreshTokenUseCase } from "../refresh-token-use-case";

export function makeRefreshTokenUseCase() {
  return new RefreshTokenUseCase(makeAuthProvider());
}
