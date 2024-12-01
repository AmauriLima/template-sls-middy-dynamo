import { AuthProvider } from "@/application/shared/providers/auth-provider/auth-provider";
import { IUseCase } from "@/application/shared/use-cases/use-case";

export type ResetPasswordParams = any;
export type ResetPasswordresult = any;

export class ResetPasswordUseCase implements IUseCase<ResetPasswordParams, ResetPasswordresult> {
  constructor(private readonly authProvider: AuthProvider) {}

  async execute(params: ResetPasswordParams): Promise<ResetPasswordresult> {
    await this.authProvider.resetPassword(params);
  }
}
