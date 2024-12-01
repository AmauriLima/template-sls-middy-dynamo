import { AuthProvider, RefreshTokenResponse } from "@/application/shared/providers/auth-provider/auth-provider";
import { IUseCase } from "@/application/shared/use-cases/use-case";
import { RefreshTokenSchemaType } from "./refresh-token-dto";

export type RefreshTokenParams = RefreshTokenSchemaType;

export type RefreshTokenResult = RefreshTokenResponse;

export class RefreshTokenUseCase implements IUseCase<RefreshTokenParams, RefreshTokenResult> {
  constructor(private readonly authProvider: AuthProvider) {}

  async execute(params: RefreshTokenParams): Promise<RefreshTokenResult> {
    return this.authProvider.refreshToken(params);
  }
}
