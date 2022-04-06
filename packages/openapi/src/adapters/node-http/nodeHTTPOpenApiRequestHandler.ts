// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { URLSearchParams } from 'url';
// import { assertNotBrowser } from '../../assertNotBrowser';
// import { HTTPRequest } from '../../http/internals/types';
// import { resolveHTTPResponse } from '../../http/resolveHTTPResponse';
// import { AnyRouter, inferRouterContext } from '../../router';
// import { getPostBody } from './internals/getPostBody';
// import {
//   NodeHTTPHandlerOptions,
//   NodeHTTPRequest,
//   NodeHTTPResponse,
// } from './types';

import {
  assertNotBrowser,
  TRPCError,
  HTTP_METHOD_PROCEDURE_TYPE_MAP,
  getStatusCodeFromKey,
  getErrorFromUnknown,
} from '@trpc/server';
import type { ResponseMeta } from '@trpc/server';

import type {
  OpenApiResponse,
  CreateOpenApiHandlerOptions,
  NodeHTTPRequest,
  NodeHTTPResponse,
} from './types';
import type { OpenApiCompliantRouter } from '../../types';

assertNotBrowser();

type NodeHTTPOpenApiRequestHandlerOptions<
  TRouter extends OpenApiCompliantRouter,
  TRequest extends NodeHTTPRequest,
  TResponse extends NodeHTTPResponse,
> = {
  req: TRequest;
  res: TResponse;
  path: string;
} & CreateOpenApiHandlerOptions<TRouter, TRequest, TResponse>;

export async function nodeHTTPOpenApiRequestHandler<
  TRouter extends OpenApiCompliantRouter,
  TRequest extends NodeHTTPRequest,
  TResponse extends NodeHTTPResponse,
>(opts: NodeHTTPOpenApiRequestHandlerOptions<TRouter, TRequest, TResponse>) {
  const { req, res, path } = opts;
  const method = req.method!;

  if (method === 'HEAD') {
    // can be used for lambda warmup
    res.statusCode = 204;
    res.end();
    return;
  }

  const type = HTTP_METHOD_PROCEDURE_TYPE_MAP[method] ?? 'unknown';
  let input: any;
  let ctx: any;

  let statusCode: number;
  let meta: ResponseMeta | undefined;
  let body: OpenApiResponse;

  try {
    if (type !== 'query' && type !== 'mutation') {
      throw new TRPCError({
        message: `Unexpected request method ${method}`,
        code: 'METHOD_NOT_SUPPORTED',
      });
    }

    input = type === 'query' ? req.query : req.body;
    ctx = await opts.createContext?.({ req, res });

    const caller = opts.router.createCaller(ctx);
    const handler = caller[type] as any;
    const data = await handler(opts.path, input);

    statusCode = 200;
    meta = opts.responseMeta?.({
      data: [{ id: null, result: data }],
      ctx,
      paths: [path],
      type,
      errors: [],
    });
    body = { ok: true, data: data ?? null };
  } catch (cause) {
    const error = getErrorFromUnknown(cause);
    const errorShape = opts.router.getErrorShape({
      error,
      type,
      path,
      input,
      ctx,
    });

    opts.onError?.({ error, type, path, req, input, ctx });

    statusCode = getStatusCodeFromKey(error.code);
    meta = opts.responseMeta?.({
      data: [{ id: null, error: errorShape as any }],
      ctx,
      paths: [path],
      type,
      errors: [],
    });
    body = { ok: false, error: errorShape };
  } finally {
    res.statusCode = meta?.status ?? statusCode!;
    res.setHeader('Content-Type', 'application/json');
    for (const [name, value] of Object.entries(meta?.headers ?? {})) {
      res.setHeader(name, value);
    }
    res.end(JSON.stringify(body!));
    await opts.teardown?.();
  }
}
