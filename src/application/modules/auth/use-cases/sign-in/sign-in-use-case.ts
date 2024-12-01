import { AuthProvider, SignInResponse } from "@/application/shared/providers/auth-provider/auth-provider";
import { IUseCase } from "@/application/shared/use-cases/use-case";
import { SignInSchemaType } from "./sign-in-dto";

export type SignInParams = SignInSchemaType;

export type SignInResult = SignInResponse;

export class SignInUseCase implements IUseCase<SignInParams, SignInResult> {
  constructor(private readonly authProvider: AuthProvider) {}

  async execute(params: SignInParams): Promise<SignInResult> {
    return this.authProvider.signIn(params);
  }
}
