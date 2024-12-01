import { UnauthorizedHTTPError } from "@/application/shared/infra/http/errors/unauthorized-http-error";
import { HttpResponse } from "@/application/shared/infra/http/response/http-response";
import { IController } from "@/application/types/IController";
import { IHttpRequest, IHttpResponse } from "@/application/types/IHttp";
import { GetProfileUseCase } from "./get-profile-use-case";

export class GetProfileController implements IController {
  constructor(private readonly useCase: GetProfileUseCase) {}

  async handler(request: IHttpRequest<undefined, undefined>): Promise<IHttpResponse> {
    const { userId } = request;

    if (!userId) {
      throw new UnauthorizedHTTPError({
        message: 'Usuário não encontrado'!
      });
    }

    const data = await this.useCase.execute({ userId });

    return new HttpResponse({ body: data }).ok();
  }
}
