import type { IBody, IHeaders, IHttpResponse } from "@/application/types/IHttp";
import { IHttpStatusCode } from "@/application/types/IHttp";

interface IHttpResponseContructor {
  body?: IBody;
  headers?: IHeaders;
}

export class HttpResponse {
  constructor(private response?: IHttpResponseContructor) {}

  ok(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.OK,
      ...this.response,
    }
  };

  created(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.CREATED,
      ...this.response,
    }
  };

  noContent(): IHttpResponse {
    return {
      statusCode: IHttpStatusCode.NO_CONTENT,
      headers: this.response?.headers,
    }
  };
}
