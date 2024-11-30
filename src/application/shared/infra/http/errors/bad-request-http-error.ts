import { IHttpStatusCode } from "@/application/types/IHttp";
import { type ErrorMessage, HttpError } from "./http-error";

export class BadRequestHttpError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(IHttpStatusCode.BAD_REQUEST, message);
  }
}
