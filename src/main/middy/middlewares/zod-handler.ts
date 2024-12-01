import { IHttpStatusCode } from "@/application/types/IHttp";
import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import z, { ZodError } from "zod";

export interface ZodSchemas {
  body?: z.AnyZodObject;
  params?: z.AnyZodObject;
}

export function zodHandler(schemas?: ZodSchemas): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    before: (request) => {
      const body = schemas?.body ? schemas.body.parse(request.event.body) : request.event.pathParameters;
      const params = schemas?.params ? schemas.params.parse(request.event.pathParameters) : request.event.pathParameters;

      (request.event as any).body = body;
      request.event.pathParameters = params;
    },
    onError: (request) => {
      const { error } = request;
      if (error instanceof ZodError) {
        const zodErrors = JSON.parse(error.message);
        const zodErrorMessages = zodErrors.map((e: any) => {
          const message = e.message;

          if (e.path.length) {
            return message + '. Erro em: ' + e.path;
          } else {
            return message;
          }
        });

        request.response = {
          ...request.response,
          statusCode: IHttpStatusCode.BAD_REQUEST,
          body: JSON.stringify({
            message: zodErrorMessages
          }),
        }
      }
    }
  }
}
