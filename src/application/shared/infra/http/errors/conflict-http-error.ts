

import { IHttpStatusCode } from "@/application/types/IHttp";
import { ErrorMessage, HttpError } from './http-error';

export class ConflictHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.CONFLICT, message);
  }
}
