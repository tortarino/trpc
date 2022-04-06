import type { DefaultErrorShape } from '@trpc/server';

import type {
  NodeHTTPHandlerOptions,
  NodeHTTPRequest,
  NodeHTTPResponse,
} from 'packages/server/src/adapters/node-http';
import type { OpenApiCompliantRouter } from '../../types';

export type { NodeHTTPRequest, NodeHTTPResponse };

export type OpenApiResponse =
  | { ok: true; data: any }
  | { ok: false; error: DefaultErrorShape };

// Request batching is not currently supported by tRPC OpenAPI handlers.
export type CreateOpenApiHandlerOptions<
  TRouter extends OpenApiCompliantRouter,
  TRequest extends NodeHTTPRequest,
  TResponse extends NodeHTTPResponse,
> = Omit<NodeHTTPHandlerOptions<TRouter, TRequest, TResponse>, 'batching'> & {
  batching?: {
    enabled: false;
  };
};
