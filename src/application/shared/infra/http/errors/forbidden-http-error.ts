
import { IHttpStatusCode } from "@/application/types/IHttp";
import { type ErrorMessage, HttpError } from "./http-error";

export class ForbiddenHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.FORBIDDEN, message);
  }
}
