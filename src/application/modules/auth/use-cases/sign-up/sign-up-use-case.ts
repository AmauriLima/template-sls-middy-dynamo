import { AuthProvider, SignUpResponse } from "@/application/shared/providers/auth-provider/auth-provider";
import { IUseCase } from "@/application/shared/use-cases/use-case";
import { SignUpSchemaType } from "./sign-up-dto";

export type SignUpParams = SignUpSchemaType;

export type SignUpResult = SignUpResponse;

export class SignUpUseCase implements IUseCase<SignUpParams, SignUpResult> {
  constructor(private readonly authProvider: AuthProvider) {}

  async execute(params: SignUpParams): Promise<SignUpResult> {
    return this.authProvider.signUp(params);
  }
}
