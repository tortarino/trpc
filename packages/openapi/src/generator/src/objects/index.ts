import { Procedure } from '@trpc/server/dist/declarations/src/internals/procedure';
import type { OpenAPIV3 } from 'openapi-types';
import {
  getReponseBodySchema,
  getRequestBodySchema,
  getRequestQueryParametersSchema,
} from './schemas';
import type { TRPCProcedure, TRPCRouter } from './types';

export const getOpenApiVersion = () => '3.0.0' as const;

export const getInfoObject = (
  title: string,
  version: string,
  description?: string,
): OpenAPIV3.InfoObject => ({ title, version, description });

export const getServersObject = (baseUrl: string): OpenAPIV3.ServerObject[] => [
  { url: baseUrl },
];

export const getPathsObject = (router: TRPCRouter): OpenAPIV3.PathsObject => {
  const getTags = (path: string): string[] => {
    const [operation, ...tags] = path.split('.').reverse();
    return tags;
  };

  const getInputOutputParsers = (procedure: TRPCProcedure) => {
    return procedure as unknown as {
      inputParser: typeof procedure['inputParser'];
      outputParser: typeof procedure['outputParser'];
    };
  };

  const { queries, mutations } = router._def;

  const pathsObject: OpenAPIV3.PathsObject = {};

  for (const path in queries) {
    const query = queries[path]!;
    const { inputParser, outputParser } = getInputOutputParsers(query);
    pathsObject[`/${path}`] = {
      ...pathsObject[`/${path}`],
      get: {
        tags: getTags(path),
        operationId: `query.${path}`,
        parameters: getRequestQueryParametersSchema(inputParser),
        responses: getReponseBodySchema(outputParser),
      },
    };
  }

  for (const path in mutations) {
    const mutation = mutations[path]!;
    const { inputParser, outputParser } = getInputOutputParsers(mutation);
    pathsObject[`/${path}`] = {
      ...pathsObject[`/${path}`],
      post: {
        tags: getTags(path),
        operationId: `mutation.${path}`,
        requestBody: getRequestBodySchema(inputParser),
        responses: getReponseBodySchema(outputParser),
      },
    };
  }

  return pathsObject;
};

export const getComponentsObject = (): OpenAPIV3.ComponentsObject => ({});

export const getSecurityObject =
  (): OpenAPIV3.SecurityRequirementObject[] => [];

export const getExternalDocsObject = (
  url: string,
): OpenAPIV3.ExternalDocumentationObject => ({ url });
