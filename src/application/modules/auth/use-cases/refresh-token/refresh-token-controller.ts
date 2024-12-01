import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { RefreshTokenParams, RefreshTokenUseCase } from "./refresh-token-use-case";

export class RefreshTokenController implements IController<RefreshTokenParams> {
  constructor(private readonly useCase: RefreshTokenUseCase) {}

  async handler(request: IHttpRequest<RefreshTokenParams, undefined>): Promise<IHttpResponse> {
    const { accessToken, refreshToken } = await this.useCase.execute(request.body);

    return new HttpResponse({
      body: {
        accessToken,
        refreshToken,
      }
    }).ok();
  }
}
