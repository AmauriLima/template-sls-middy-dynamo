import { env } from "@/application/config/env";
import { IHttpStatusCode } from "@/application/types/IHttp";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1),
  redirect_uri: z.string().min(1),
});

export async function handler(event: APIGatewayProxyEventV2) {
  const { success, data, error } = schema.safeParse(event.queryStringParameters);

  if (!success) {
    return {
      statusCode: IHttpStatusCode.BAD_REQUEST,
      body: {
        errors: error.issues,
      }
    }
  }

  const { code, redirect_uri } = data;

  const authorizationToken = Buffer.from(`${env.COGNITO_CLIENT_ID}:${env.COGNITO_CLIENT_SECRET}`).toString('base64');

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
    return {
      statusCode: IHttpStatusCode.UNAUTHORIZED,
      body: JSON.stringify({
        errors: 'Erro while exchanging code',
      }),
      headers: {
        'content-type': 'application/json'
      }
    }
  }

  const { access_token, refresh_token } = await resp.json();

  return {
    statusCode: IHttpStatusCode.OK,
    body: JSON.stringify({
      accessToken: access_token,
      refreshToken: refresh_token,
    }),
    headers: {
      'content-type': 'application/json'
    }
  };
};
