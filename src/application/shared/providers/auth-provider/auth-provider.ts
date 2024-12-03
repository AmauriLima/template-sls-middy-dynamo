import { AccountConfirmationSchemaType } from "@/application/modules/auth/use-cases/account-confirmation/account-confirmation-dto";
import { ForgotPasswordSchemaType } from "@/application/modules/auth/use-cases/forgot-password/forgot-password-dto";
import { RefreshTokenSchemaType } from "@/application/modules/auth/use-cases/refresh-token/refresh-token-dto";
import { ResetPasswordSchemaType } from "@/application/modules/auth/use-cases/reset-password/reset-password-dto";
import { SignInSchemaType } from "@/application/modules/auth/use-cases/sign-in/sign-in-dto";
import { SignUpSchemaType } from "@/application/modules/auth/use-cases/sign-up/sign-up-dto";

export interface SignUpResponse {
  userId: string;
}

export interface SignInResponse {
  accessToken?: string;
  refreshToken?: string;
}

export type RefreshTokenResponse = SignInResponse;

export type GetUserParams = { userId: string };
export type Profile = {
  sub: string;
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
}
export type GetUserResponse = {
  profile: {
    id: string;
    email: string;
    emailVerified: boolean;
    givenName: string;
    familyName: string;
  }
};


export interface CreateUserParams {
  userPoolId: string;
  email: string;
  givenName: string;
  familyName: string;
}

export interface GetUserByEmailParams {
  userPoolId: string;
  email: string;
  paginationToken?: string;
}


export interface LinkProviderParams {
  userPoolId: string;
  nativeUserId: string;
  providerName: string;
  providerUserId: string;
}


export interface AuthProvider {
  signUp(params: SignUpSchemaType): Promise<SignUpResponse>;
  signIn(params: SignInSchemaType): Promise<SignInResponse>;
  refreshToken(params: RefreshTokenSchemaType): Promise<RefreshTokenResponse>;
  accountConfirmation(params: AccountConfirmationSchemaType): Promise<void>;
  getUser(params: GetUserParams): Promise<GetUserResponse>;
  forgotPassword(params: ForgotPasswordSchemaType): Promise<void>;
  resetPassword(params: ResetPasswordSchemaType): Promise<void>;
  createUser(params: CreateUserParams): Promise<string>;
  getUserByEmail(params: GetUserByEmailParams): Promise<string | undefined>;
  linkProvider(params: LinkProviderParams): Promise<void>;
}
