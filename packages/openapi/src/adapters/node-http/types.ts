import type {
  NodeHTTPHandlerOptions,
  NodeHTTPRequest,
  NodeHTTPResponse,
} from 'packages/server/src/adapters/node-http';
import type { OpenApiCompliantRouter } from '../../types';

export type { NodeHTTPRequest, NodeHTTPResponse };

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
