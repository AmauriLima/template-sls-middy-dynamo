import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { SignInParams, SignInUseCase } from "./sign-in-use-case";

export class SignInController implements IController<SignInParams> {
  constructor(private readonly useCase: SignInUseCase) {}

  async handler(request: IHttpRequest<SignInParams, undefined>): Promise<IHttpResponse> {
    const { accessToken, refreshToken } = await this.useCase.execute(request.body);

    return new HttpResponse({
      body: {
        accessToken,
        refreshToken,
      }
    }).ok();
  }
}
