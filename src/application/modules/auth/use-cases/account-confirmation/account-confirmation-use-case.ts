import { AuthProvider } from "@/application/shared/providers/auth-provider/auth-provider";
import { IUseCase } from "@/application/shared/use-cases/use-case";
import { AccountConfirmationSchemaType } from "./account-confirmation-dto";

export type AccountConfirmationParams = AccountConfirmationSchemaType;
export type AccountConfirmationResult = void;

export class AccountConfirmationUseCase
  implements IUseCase<AccountConfirmationParams, AccountConfirmationResult>
{
  constructor(private readonly authProvider: AuthProvider) {}

  async execute(params: AccountConfirmationParams): Promise<void> {
    await this.authProvider.accountConfirmation(params);
  }
}
