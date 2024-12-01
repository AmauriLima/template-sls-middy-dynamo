import { AuthProvider } from "@/application/shared/providers/auth-provider/auth-provider";
import { IUseCase } from "@/application/shared/use-cases/use-case";

export type ForgotPasswordParams = any;
export type ForgotPasswordresult = any;

export class ForgotPasswordUseCase implements IUseCase<ForgotPasswordParams, ForgotPasswordresult> {
  constructor(private readonly authProvider: AuthProvider) {}

  async execute(params: ForgotPasswordParams): Promise<ForgotPasswordresult> {
    await this.authProvider.forgotPassword(params);
  }
}
