import { HttpError } from "@/application/shared/infra/http/errors/http-error";
import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export function errorHandler(): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    onError: (request) => {
      const { error } = request;

      if (error && (error instanceof HttpError || 'statusCode' in error)) {
        request.response = {
          ...request.response,
          statusCode: error.statusCode,
          body: error.message,
          headers: {
            ...request.response?.headers,
            'content-type': 'application/json'
          }
        }
      } else {
        request.response = {
          ...request.response,
          statusCode: 500,
          body: JSON.stringify({ error: 'Deu ruim no servidor!' }),
          headers: {
            ...request.response?.headers,
            'content-type': 'application/json'
          }
        }
      }
    },
  }
}
