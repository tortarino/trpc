/* eslint-disable @typescript-eslint/ban-types */
import { expectTypeOf } from 'expect-type';
import { z } from 'zod';
import * as trpcOpenApi from '../../openapi/src';
import * as trpc from '../src';
import { TRPCRouter, inferProcedureInput, inferProcedureOutput } from '../src';

test('router', () => {
  const openApiRouter = trpcOpenApi.router();
  expectTypeOf(
    openApiRouter,
  ).toMatchTypeOf<trpcOpenApi.OpenApiCompliantRouter>();
});

test('queries', () => {
  const openApiRouter = trpcOpenApi
    .router()
    .query('noInput', {
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .query('nullInput', {
      // @ts-expect-error - Only input types that statisfy Record<string, string> are valid
      input: z.null(),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .query('stringInput', {
      // @ts-expect-error - Only input types that statisfy Record<string, string> are valid
      input: z.string(),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .query('arrayInput', {
      // @ts-expect-error - Only input types that statisfy Record<string, string> are valid
      input: z.array(z.string()),
      resolve: async ({ input }) => {
        return { input: input };
      },
    })
    .query('emptyObjectInput', {
      input: z.object({}),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .query('objectStringValuesInput', {
      input: z.object({
        string: z.string(),
        string2: z.string(),
      }),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .query('objectNumberValuesInput', {
      // @ts-expect-error - Only input types that statisfy Record<string, string> are valid
      input: z.object({
        number: z.number(),
      }),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .query('deepObjectInput', {
      // @ts-expect-error - Only input types that statisfy Record<string, string> are valid
      input: z.object({
        object: z.object({}),
      }),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .query('withOutput', {
      input: z.object({
        string: z.string(),
      }),
      output: z.object({
        input: z.object({
          string: z.string(),
        }),
      }),
      resolve: ({ input }) => {
        return { input: input };
      },
    });

  type TQueries = typeof openApiRouter['_def']['queries'];
  {
    const input: inferProcedureInput<TQueries['noInput']> = null as any;
    const output: inferProcedureOutput<TQueries['noInput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<undefined | null | void>();
    expectTypeOf(output).toMatchTypeOf<{ input: undefined }>();
  }
  {
    const input: inferProcedureInput<TQueries['noInput']> = null as any;
    const output: inferProcedureOutput<TQueries['noInput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<undefined | null | void>();
    expectTypeOf(output).toMatchTypeOf<{ input: undefined }>();
  }
  {
    const input: inferProcedureInput<TQueries['stringInput']> = null as any;
    const output: inferProcedureOutput<TQueries['stringInput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<Record<string, string>>();
    expectTypeOf(output).toMatchTypeOf<unknown>();
  }
  {
    const input: inferProcedureInput<TQueries['emptyObjectInput']> =
      null as any;
    const output: inferProcedureOutput<TQueries['emptyObjectInput']> =
      null as any;
    expectTypeOf(input).toMatchTypeOf<Record<string, never>>();
    expectTypeOf(output).toMatchTypeOf<{ input: Record<string, never> }>();
  }
  {
    const input: inferProcedureInput<TQueries['objectStringValuesInput']> =
      null as any;
    const output: inferProcedureOutput<TQueries['objectStringValuesInput']> =
      null as any;
    expectTypeOf(input).toMatchTypeOf<{ string: string; string2: string }>();
    expectTypeOf(output).toMatchTypeOf<{
      input: { string: string; string2: string };
    }>();
  }
  {
    const input: inferProcedureInput<TQueries['withOutput']> = null as any;
    const output: inferProcedureOutput<TQueries['withOutput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<{ string: string }>();
    expectTypeOf(output).toMatchTypeOf<{ input: { string: string } }>();
  }
});

test('mutations', () => {
  const openApiRouter = trpcOpenApi
    .router()
    .mutation('noInput', {
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .mutation('stringInput', {
      input: z.string(),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .mutation('arrayInput', {
      input: z.array(z.string()),
      resolve: async ({ input }) => {
        return { input: input };
      },
    })
    .mutation('objectStringValuesInput', {
      input: z.object({
        string: z.string(),
        string2: z.string(),
      }),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .mutation('deepObjectInput', {
      input: z.object({
        object: z.object({}),
      }),
      resolve: ({ input }) => {
        return { input: input };
      },
    })
    .mutation('withOutput', {
      input: z.object({
        string: z.string(),
      }),
      output: z.object({
        input: z.object({
          string: z.string(),
        }),
      }),
      resolve: ({ input }) => {
        return { input: input };
      },
    });

  type TMutations = typeof openApiRouter['_def']['mutations'];
  {
    const input: inferProcedureInput<TMutations['noInput']> = null as any;
    const output: inferProcedureOutput<TMutations['noInput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<undefined | null | void>();
    expectTypeOf(output).toMatchTypeOf<{ input: undefined }>();
  }
  {
    const input: inferProcedureInput<TMutations['stringInput']> = null as any;
    const output: inferProcedureOutput<TMutations['stringInput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<string>();
    expectTypeOf(output).toMatchTypeOf<{ input: string }>();
  }
  {
    const input: inferProcedureInput<TMutations['arrayInput']> = null as any;
    const output: inferProcedureOutput<TMutations['arrayInput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<string[]>();
    expectTypeOf(output).toMatchTypeOf<{ input: string[] }>();
  }
  {
    const input: inferProcedureInput<TMutations['objectStringValuesInput']> =
      null as any;
    const output: inferProcedureOutput<TMutations['objectStringValuesInput']> =
      null as any;
    expectTypeOf(input).toMatchTypeOf<{ string: string; string2: string }>();
    expectTypeOf(output).toMatchTypeOf<{
      input: { string: string; string2: string };
    }>();
  }
  {
    const input: inferProcedureInput<TMutations['deepObjectInput']> =
      null as any;
    const output: inferProcedureOutput<TMutations['deepObjectInput']> =
      null as any;
    expectTypeOf(input).toMatchTypeOf<{ object: Record<string, never> }>();
    expectTypeOf(output).toMatchTypeOf<{
      input: { object: Record<string, never> };
    }>();
  }
  {
    const input: inferProcedureInput<TMutations['withOutput']> = null as any;
    const output: inferProcedureOutput<TMutations['withOutput']> = null as any;
    expectTypeOf(input).toMatchTypeOf<{ string: string }>();
    expectTypeOf(output).toMatchTypeOf<{ input: { string: string } }>();
  }
});

test('subscriptions', () => {
  const openApiRouter = trpcOpenApi
    .router()
    // @ts-expect-error - Subscription method is not permitted on an OpenApiCompliantRouter
    .subscription('noSubscriptions', {
      resolve: () => {
        return new trpc.Subscription<string>((emit) => {
          emit.data('string');
          return () => null;
        });
      },
    });

  expectTypeOf(openApiRouter['subscription']).toMatchTypeOf<any>();
});
