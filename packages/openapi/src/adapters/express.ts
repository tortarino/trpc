import type * as express from 'express';

import { nodeHTTPOpenApiRequestHandler } from './node-http';
import type { CreateOpenApiHandlerOptions } from './node-http';
import type { OpenApiCompliantRouter } from '../types';

export const createExpressOpenApiHandler = <
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
