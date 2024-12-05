import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpMultipartBodyParser from '@middy/http-multipart-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';

import { IController } from '../../application/types/IController';
import { errorHandler } from './middlewares/error-handler';
import { zodHandler, ZodSchemas } from './middlewares/zod-handler';
import { sanitizeObject } from './utils/sanitize-object';

export function makeHandler(
    controller: IController<any, any, any>,
    schemas?: ZodSchemas
) {
  return middy()
    .use(httpJsonBodyParser({ disableContentTypeError: true }))
    .use(httpMultipartBodyParser({ disableContentTypeError: true }))
    .use(zodHandler(schemas))
    .use(errorHandler())
    .use(httpResponseSerializer({
      defaultContentType: 'application/json',
      serializers: [{
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body),
      }],
    }))
    .handler(async (event) => {
      return controller.handler({
        body: event.body,
        query: event.queryStringParameters,
        headers: sanitizeObject(event.headers),
        params: sanitizeObject(event.pathParameters),
        userId: event.requestContext.authorizer?.jwt?.claims?.sub
      });
    });
}
