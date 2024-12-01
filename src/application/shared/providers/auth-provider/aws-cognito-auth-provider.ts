import { env } from "@/application/config/env";
import { AccountConfirmationSchemaType } from "@/application/modules/auth/use-cases/account-confirmation/account-confirmation-dto";
import { ForgotPasswordSchemaType } from "@/application/modules/auth/use-cases/forgot-password/forgot-password-dto";
import { RefreshTokenSchemaType } from "@/application/modules/auth/use-cases/refresh-token/refresh-token-dto";
import { ResetPasswordSchemaType } from "@/application/modules/auth/use-cases/reset-password/reset-password-dto";
import { SignInSchemaType } from "@/application/modules/auth/use-cases/sign-in/sign-in-dto";
import { SignUpSchemaType } from "@/application/modules/auth/use-cases/sign-up/sign-up-dto";
import { AdminGetUserCommand, AuthFlowType, CognitoIdentityProviderClient, ConfirmForgotPasswordCommand, ConfirmSignUpCommand, ForgotPasswordCommand, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "../../infra/clients/cognito-client";
import { InternalServerHTTPError } from "../../infra/http/errors/internal-server-http-error";
import { NotFoundHTTPError } from "../../infra/http/errors/not-found-http-error";
import { UnauthorizedHTTPError } from "../../infra/http/errors/unauthorized-http-error";
import type { AuthProvider, GetUserParams, GetUserResponse, Profile, RefreshTokenResponse, SignInResponse, SignUpResponse } from "./auth-provider";
import { getSecretHash } from "./utils/get-secret-hash";

export class AwsCognitoAuthProvider implements AuthProvider {
  constructor(
    private readonly cognito: CognitoIdentityProviderClient = cognitoClient,
    private readonly clientId: string = env.COGNITO_CLIENT_ID!,
    private readonly poolId: string = env.COGNITO_USER_POOL_ID!,
  ) {}

  async resetPassword(params: ResetPasswordSchemaType): Promise<void> {
    const { email, code, newPassword } = params;
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.clientId,
      SecretHash: getSecretHash(email),
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
    });

    await this.cognito.send(command);
  }

  async forgotPassword(params: ForgotPasswordSchemaType): Promise<void> {
    const { email } = params;
    const command = new ForgotPasswordCommand({
      SecretHash: getSecretHash(email),
      ClientId: this.clientId,
      Username: email,
    });
    await this.cognito.send(command);
  }

  async getUser(params: GetUserParams): Promise<GetUserResponse> {
    const { userId } = params;

    const command = new AdminGetUserCommand({
      Username: userId,
      UserPoolId: this.poolId,
    });

    const { UserAttributes } = await this.cognito.send(command);

    if (!UserAttributes) {
      throw new NotFoundHTTPError({
         message: 'Usuário não encontrado'
      });
    }

    const profile = UserAttributes.reduce((profileObj, { Name, Value }) => ({
      ...profileObj,
      [String(Name)]: Value
    }), {} as Profile);

    return {
      profile: {
        id: profile.sub,
        email: profile.email,
        emailVerified: profile.email_verified,
        givenName: profile.given_name,
        familyName: profile.family_name,
      }
    };
  }

  async refreshToken(params: RefreshTokenSchemaType): Promise<RefreshTokenResponse> {
    const { refresh_token } = params;

    const command = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      AuthParameters: {
        REFRESH_TOKEN: refresh_token,
      }
    });

    const { AuthenticationResult } = await this.cognito.send(command);

    if (!AuthenticationResult) {
      throw new UnauthorizedHTTPError({ message: 'Credenciais inválidas' });
    }

    return {
      accessToken: AuthenticationResult.AccessToken,
      refreshToken: refresh_token,
    }
  }

  async signIn(params: SignInSchemaType): Promise<SignInResponse> {
    const { email, password } = params;

    const command = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: getSecretHash(email),
      }
    });

    const { AuthenticationResult } = await this.cognito.send(command);

    if (!AuthenticationResult) {
      throw new UnauthorizedHTTPError({ message: 'Credenciais inválidas' });
    }

    return {
      accessToken: AuthenticationResult.AccessToken,
      refreshToken: AuthenticationResult.RefreshToken,
    }
  }

  async signUp(params: SignUpSchemaType): Promise<SignUpResponse> {
    const { email, family_name, given_name, password } = params;

    const command = new SignUpCommand({
      ClientId: this.clientId,
      SecretHash: getSecretHash(email),
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'given_name', Value: given_name },
        { Name: 'family_name', Value: family_name },
      ],
    });

    console.log(command.input);

    const { UserSub } = await this.cognito.send(command);

    if (!UserSub) {
      throw new InternalServerHTTPError({
        message: 'Ocorreu um erro ao registrar o usuário no cognito',
      });
    }

    return {
      userId: UserSub
    }
  }

  async accountConfirmation(params: AccountConfirmationSchemaType): Promise<void> {
    const { code, email } = params;

    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      SecretHash: getSecretHash(email),
      Username: email,
      ConfirmationCode: code,
    });

    await this.cognito.send(command);
  }
}
