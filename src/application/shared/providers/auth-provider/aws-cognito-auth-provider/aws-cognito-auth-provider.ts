import { env } from "@/application/config/env";
import { AccountConfirmationSchemaType } from "@/application/modules/auth/use-cases/account-confirmation/account-confirmation-dto";
import { ForgotPasswordSchemaType } from "@/application/modules/auth/use-cases/forgot-password/forgot-password-dto";
import { RefreshTokenSchemaType } from "@/application/modules/auth/use-cases/refresh-token/refresh-token-dto";
import { ResetPasswordSchemaType } from "@/application/modules/auth/use-cases/reset-password/reset-password-dto";
import { SignInSchemaType } from "@/application/modules/auth/use-cases/sign-in/sign-in-dto";
import { SignUpSchemaType } from "@/application/modules/auth/use-cases/sign-up/sign-up-dto";


import { cognitoClient } from "@/application/shared/infra/clients/cognito-client";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { AuthProvider, CreateUserParams, GetUserByEmailParams, GetUserParams, GetUserResponse, LinkProviderParams, RefreshTokenResponse, SignInResponse, SignUpResponse } from "../auth-provider";
import { cognitoAccountConfirmation } from "./services/cognito-account-confirmation";
import { cognitoCreateUser } from "./services/cognito-create-user";
import { cognitoForgotPassword } from "./services/cognito-forgot-password";
import { cognitoGetUser } from "./services/cognito-get-user";
import { cognitoGetUserByEmail } from "./services/cognito-get-user-by-email";
import { cognitoLinkProvider } from "./services/cognito-link-provider";
import { cognitoRefreshToken } from "./services/cognito-refresh-token";
import { cognitoResetPassword } from "./services/cognito-reset-password";
import { cognitoSignUp } from "./services/cognito-sign-up";
import { cognitoSignIn } from "./services/congito-sign-in";

export class AwsCognitoAuthProvider implements AuthProvider {
  constructor(
    private readonly cognito: CognitoIdentityProviderClient = cognitoClient,
    private readonly clientId: string = env.COGNITO_CLIENT_ID!,
    private readonly poolId: string = env.COGNITO_USER_POOL_ID!,
  ) {}

  async createUser(params: CreateUserParams): Promise<string> {
    return cognitoCreateUser(params, this.cognito);
  }

  async getUserByEmail(params: GetUserByEmailParams): Promise<string | undefined> {
    return cognitoGetUserByEmail(params, this.cognito);
  }

  async linkProvider(params: LinkProviderParams): Promise<void> {
    await cognitoLinkProvider(params, this.cognito);
  }

  async resetPassword(params: ResetPasswordSchemaType): Promise<void> {
    await cognitoResetPassword(params, this.clientId, this.cognito);
  }

  async forgotPassword(params: ForgotPasswordSchemaType): Promise<void> {
    await cognitoForgotPassword(params, this.clientId, this.cognito);
  }

  async getUser(params: GetUserParams): Promise<GetUserResponse> {
    return cognitoGetUser(params, this.poolId, this.cognito)
  }

  async refreshToken(params: RefreshTokenSchemaType): Promise<RefreshTokenResponse> {
    return cognitoRefreshToken(params, this.clientId, this.cognito);
  }

  async signIn(params: SignInSchemaType): Promise<SignInResponse> {
    return cognitoSignIn(params, this.clientId, this.cognito);
  }

  async signUp(params: SignUpSchemaType): Promise<SignUpResponse> {
    return cognitoSignUp(params, this.clientId, this.cognito);
  }

  async accountConfirmation(params: AccountConfirmationSchemaType): Promise<void> {
    await cognitoAccountConfirmation(params, this.clientId, this.cognito);
  }
}
