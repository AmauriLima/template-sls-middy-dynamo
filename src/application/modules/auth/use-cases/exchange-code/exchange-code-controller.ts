import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { ExchangeCodeSchemaType } from "./exchange-code-dto";
import { ExchangeCodeUseCase } from "./exchange-code-use-case";

export class ExchangeCodeController implements IController<undefined, undefined, ExchangeCodeSchemaType> {
  constructor (private readonly useCase: ExchangeCodeUseCase) {}

  async handler(request: IHttpRequest<undefined, undefined, ExchangeCodeSchemaType>): Promise<IHttpResponse> {
    const { accessToken, refreshToken } = await this.useCase.execute(request.query);

    return new HttpResponse({
      body: {
        accessToken,
        refreshToken,
      }
    }).ok();
  }
}
