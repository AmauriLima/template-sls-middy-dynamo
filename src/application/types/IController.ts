import { IBody, IHttpRequest, IHttpResponse, IParams } from "./IHttp";

export interface IController<TBody extends IBody | undefined = undefined, TParams extends IParams | undefined = undefined> {
  handler(request: IHttpRequest<TBody, TParams>): Promise<IHttpResponse>;
}
