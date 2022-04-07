import { TRPCError } from '@trpc/server';
import type * as next from 'next';
import type { OpenApiCompliantRouter } from '../types';
import { nodeHTTPOpenApiRequestHandler } from './node-http';
import type { CreateOpenApiHandlerOptions } from './node-http';

export const createNextOpenApiHandler = <
  TRouter extends OpenApiCompliantRouter,
>(
  opts: CreateOpenApiHandlerOptions<
    TRouter,
    next.NextApiRequest,
    next.NextApiResponse
  >,
) => {
  return async (req: next.NextApiRequest, res: next.NextApiResponse) => {
    function getPath(): string | null {
      if (typeof req.query.trpc === 'string') {
        return req.query.trpc;
      }
      if (Array.isArray(req.query.trpc)) {
        return req.query.trpc.join('/');
      }
      return null;
    }
    const path = getPath();

    if (path === null) {
      const error = opts.router.getErrorShape({
        error: new TRPCError({
          message:
            'Query "trpc" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?',
          code: 'INTERNAL_SERVER_ERROR',
        }),
        type: 'unknown',
        ctx: undefined,
        path: undefined,
        input: undefined,
      });
      res.statusCode = 500;
      res.json({ ok: false, error });
      return;
    }

    await nodeHTTPOpenApiRequestHandler({
      ...opts,
      req,
      res,
      path,
    });
  };
};
