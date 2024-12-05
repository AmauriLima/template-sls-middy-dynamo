import { UnauthorizedHTTPError } from "@/application/shared/infra/http/errors/unauthorized-http-error";
import { IUseCase } from "@/application/shared/use-cases/use-case";
import { env } from "process";
import { ExchangeCodeSchemaType } from "./exchange-code-dto";

export type ExchangeCodeUseCaseRequest = ExchangeCodeSchemaType;

export interface ExchangeCodeUseCaseResponse {
  accessToken: string;
  refreshToken: string;
};

export class ExchangeCodeUseCase implements IUseCase<ExchangeCodeUseCaseRequest, ExchangeCodeUseCaseResponse> {
  async execute(params: ExchangeCodeUseCaseRequest): Promise<ExchangeCodeUseCaseResponse> {
    const { code, redirect_uri } = params;

    const authorizationToken =
      Buffer.from(`${env.COGNITO_CLIENT_ID}:${env.COGNITO_CLIENT_SECRET}`)
        .toString('base64');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri,
      code,
    });

    const resp = await fetch(`${env.COGNITO_POOL_DOMAIN}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authorizationToken}`
      },
      body: body.toString(),
    });

    if (!resp.ok) {
      throw new UnauthorizedHTTPError({
        message: 'Error while exchanging code'
      });
    }

    const { access_token, refresh_token } = await resp.json();

    return {
      accessToken: access_token,
      refreshToken: refresh_token
    }
  }
}
