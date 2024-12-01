import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { ForgotPasswordSchemaType } from "./forgot-password-dto";
import { ForgotPasswordUseCase } from "./forgot-password-use-case";

export class ForgotPasswordController implements IController<ForgotPasswordSchemaType> {
  constructor (private readonly useCase: ForgotPasswordUseCase) {}

  async handler(request: IHttpRequest<ForgotPasswordSchemaType, undefined>): Promise<IHttpResponse> {
    await this.useCase.execute(request.body);

    return new HttpResponse().noContent();
  }
}
