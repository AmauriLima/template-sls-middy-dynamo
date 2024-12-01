import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { AccountConfirmationParams, AccountConfirmationUseCase } from "./account-confirmation-use-case";

export class AccountConfirmationController implements IController<AccountConfirmationParams> {
  constructor(private readonly useCase: AccountConfirmationUseCase) {}

  async handler(request: IHttpRequest<AccountConfirmationParams, undefined>): Promise<IHttpResponse> {
    await this.useCase.execute(request.body);

    return new HttpResponse().noContent();
  }
}
