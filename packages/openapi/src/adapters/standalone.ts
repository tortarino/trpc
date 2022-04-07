import * as http from 'http';
import url from 'url';
import type { OpenApiCompliantRouter } from '../types';
import { nodeHTTPOpenApiRequestHandler } from './node-http';
import type { CreateOpenApiHandlerOptions } from './node-http';

export const createHTTPOpenApiHandler = <
  TRouter extends OpenApiCompliantRouter,
>(
  opts: CreateOpenApiHandlerOptions<
    TRouter,
    http.IncomingMessage,
    http.ServerResponse
  >,
) => {
  return async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const path = url.parse(req.url!).pathname!.slice(1);

    await nodeHTTPOpenApiRequestHandler({
      ...opts,
      req,
      res,
      path,
    });
  };
};

export const createHTTPOpenApiServer = <TRouter extends OpenApiCompliantRouter>(
  opts: CreateOpenApiHandlerOptions<
    TRouter,
    http.IncomingMessage,
    http.ServerResponse
  >,
) => {
  const handler = createHTTPOpenApiHandler(opts);
  const server = http.createServer((req, res) => handler(req, res));

  return {
    server,
    listen(port?: number) {
      server.listen(port);
      const actualPort =
        port === 0 ? ((server.address() as any).port as number) : port;

      return {
        port: actualPort,
      };
    },
  };
};
