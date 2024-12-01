import { AwsCognitoAuthProvider } from "@/application/shared/providers/auth-provider/aws-cognito-auth-provider";
import { RefreshTokenUseCase } from "../refresh-token-use-case";

export function makeRefreshTokenUseCase() {
  return new RefreshTokenUseCase(new AwsCognitoAuthProvider());
}
