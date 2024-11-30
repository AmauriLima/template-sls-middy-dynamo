import { IHttpStatusCode } from "@/application/types/IHttp";

export type ErrorMessage =Record<string, any>;

export class HttpError extends Error {
  constructor(
    public readonly statusCode: IHttpStatusCode,
    message?: ErrorMessage
  ) {
    super(JSON.stringify(message))

    this.name = 'HttpError';
  }
}
