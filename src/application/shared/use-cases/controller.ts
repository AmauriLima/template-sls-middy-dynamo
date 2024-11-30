import type { IBody, IHttpRequest, IHttpResponse, IParams } from "@/application/types/IHttp";

export interface IController<TBody extends IBody | undefined = undefined, TParams extends IParams | undefined = undefined> {
  handler(request: IHttpRequest<TBody, TParams>): Promise<IHttpResponse>;
}
