
import { IHttpStatusCode } from "@/application/types/IHttp";
import { type ErrorMessage, HttpError } from "./http-error";

export class UnauthorizedHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.UNAUTHORIZED, message);
  }
}
