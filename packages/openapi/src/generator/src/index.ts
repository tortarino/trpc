import type { OpenAPIV3 } from 'openapi-types';
import type { TRPCRouter } from './types';

import {
  getOpenApiVersion,
  getInfoObject,
  getServersObject,
  getPathsObject,
  getComponentsObject,
  getSecurityObject,
  getExternalDocsObject,
} from './objects';

export type RouterToOpenApiSchemaOpts = {
  name: string,
  description?: string,
  version: string,
  baseUrl: string,
  docsUrl?: string,
};

export const trpcRouterToOpenApiSchema = (trpcRouter: TRPCRouter, opts: RouterToOpenApiSchemaOpts): OpenAPIV3.Document => {
  return {
    openapi: getOpenApiVersion(),
    info: getInfoObject(opts.name, opts.version, opts.description),
    servers: getServersObject(opts.baseUrl),
    paths: getPathsObject(trpcRouter),
    components: getComponentsObject(),
    security: getSecurityObject(),
    ...opts.docsUrl && { externalDocs: getExternalDocsObject(opts.docsUrl) },
  };
};
