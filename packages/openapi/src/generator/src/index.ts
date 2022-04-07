import type { OpenAPIV3 } from 'openapi-types';
import {
  getComponentsObject,
  getExternalDocsObject,
  getInfoObject,
  getOpenApiVersion,
  getPathsObject,
  getSecurityObject,
  getServersObject,
} from './objects';
import type { TRPCRouter } from './types';

export type RouterToOpenApiSchemaOpts = {
  name: string;
  description?: string;
  version: string;
  baseUrl: string;
  docsUrl?: string;
};

export const trpcRouterToOpenApiSchema = (
  trpcRouter: TRPCRouter,
  opts: RouterToOpenApiSchemaOpts,
): OpenAPIV3.Document => {
  return {
    openapi: getOpenApiVersion(),
    info: getInfoObject(opts.name, opts.version, opts.description),
    servers: getServersObject(opts.baseUrl),
    paths: getPathsObject(trpcRouter),
    components: getComponentsObject(),
    security: getSecurityObject(),
    ...(opts.docsUrl && { externalDocs: getExternalDocsObject(opts.docsUrl) }),
  };
};
