import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { SignUpParams, SignUpUseCase } from "./sign-up-use-case";

export class SignUpController implements IController<SignUpParams> {
  constructor(private readonly useCase: SignUpUseCase) {}

  async handler(request: IHttpRequest<SignUpParams, undefined>): Promise<IHttpResponse> {
    const { userId } = await this.useCase.execute(request.body);

    return new HttpResponse({
      body: {
        userId,
      }
    }).created();
  }
}
