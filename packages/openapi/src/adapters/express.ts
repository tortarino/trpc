import type * as express from 'express';
import type { OpenApiCompliantRouter } from '../types';
import { nodeHTTPOpenApiRequestHandler } from './node-http';
import type { CreateOpenApiHandlerOptions } from './node-http';

export const createExpressOpenApiMiddleware = <
  TRouter extends OpenApiCompliantRouter,
>(
  opts: CreateOpenApiHandlerOptions<TRouter, express.Request, express.Response>,
) => {
  return async (req: express.Request, res: express.Response) => {
    const path = req.path.slice(1);

    await nodeHTTPOpenApiRequestHandler({
      ...opts,
      req,
      res,
      path,
    });
  };
};
