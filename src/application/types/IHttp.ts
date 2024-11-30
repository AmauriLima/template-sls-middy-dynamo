export type IBody = Record<string, any>;
export type IParams = Record<string, string>;
export type IHeaders = Record<string, string>;

export interface IHttpRequest<TBody extends IBody | undefined, TParams extends IParams | undefined> {
  body?: TBody;
  headers?: IHeaders;
  params?: TParams;
}

export interface IHttpResponse {
  statusCode: IHttpStatusCode;
  body?: IBody;
  headers?: IHeaders;
}

export enum IHttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
