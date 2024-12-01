import { AuthProvider, GetUserParams, GetUserResponse } from "@/application/shared/providers/auth-provider/auth-provider";
import { IUseCase } from "@/application/shared/use-cases/use-case";

export type GetProfileParams = GetUserParams;
export type GetProfileResult = GetUserResponse;

export class GetProfileUseCase implements IUseCase<GetProfileParams, GetProfileResult> {
  constructor(private readonly authProvider: AuthProvider) {}

  async execute(params: GetProfileParams): Promise<GetProfileResult> {
    return this.authProvider.getUser(params);
  }
}
