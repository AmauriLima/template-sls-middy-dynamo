import { IBody, IHttpRequest, IHttpResponse, IParams, IQuery } from "./IHttp";

export interface IController<
  TBody extends IBody | undefined = undefined,
  TParams extends IParams | undefined = undefined,
  TQuery extends IQuery | undefined = undefined,
> {
  handler(request: IHttpRequest<TBody, TParams, TQuery>): Promise<IHttpResponse>;
}
