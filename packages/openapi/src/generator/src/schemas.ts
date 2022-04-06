import { OpenAPIV3 } from 'openapi-types';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const parserToZod = (parser: any) => parser instanceof z.ZodType && parser;

const zodToOpenApiSchema = (zod: z.ZodType): OpenAPIV3.SchemaObject => {
  return zodToJsonSchema(zod, { target: 'openApi3' });
};

export const getRequestQueryParametersSchema = (parser: any): [OpenAPIV3.ParameterObject] | undefined => {
  const zod = parserToZod(parser);
  if (!zod) {
    return undefined;
  }
  return [{
    description: zod.description || undefined,
    name: 'input',
    in: 'query',
    required: !zod.isOptional(),
    schema: zodToOpenApiSchema(zod),
    style: 'form',
    explode: true,
  }];
};

export const getRequestBodySchema = (parser: any): OpenAPIV3.RequestBodyObject | undefined => {
  const zod = parserToZod(parser);
  if (!zod) {
    return undefined;
  }
  return {
    description: zod.description || undefined,
    required: true,
    content: {
      'application/json': {
        schema: zodToOpenApiSchema(zod),
      },
    },
  };
};

export const getReponseBodySchema = (parser: any): OpenAPIV3.ResponsesObject => {
  let zod = parserToZod(parser);
  if (!zod) {
    zod = z.null({ description: 'Successful response data is unknown' });
  }
  return {
    200: {
      description: zod.description || 'Successful response',
      content: {
        'application/json': {
          schema: zodToOpenApiSchema(z.object({
            ok: z.literal(true),
            data: zod,
          })),
        },
      },
    },
  };
};
