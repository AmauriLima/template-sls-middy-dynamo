import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { ResetPasswordSchemaType } from "./reset-password-dto";
import { ResetPasswordUseCase } from "./reset-password-use-case";

export class ResetPasswordController implements IController<ResetPasswordSchemaType> {
  constructor (private readonly useCase: ResetPasswordUseCase) {}

  async handler(request: IHttpRequest<ResetPasswordSchemaType, undefined>): Promise<IHttpResponse> {
    await this.useCase.execute(request.body);

    return new HttpResponse().noContent();
  }
}
