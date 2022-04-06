import { z } from 'zod';
import * as trpc from '@trpc/server';

export const router = trpc.router()
  .query('query-string', {
    input: z.string(),
    output: z.object({
      input: z.string(),
    }),
    resolve: ({ input }) => {
      return { input };
    },
  })
  .query('query-object', {
    input: z.object({
      input: z.string(),
    }),
    output: z.object({
      input: z.string(),
    }),
    resolve: ({ input }) => {
      return { input: input.input };
    },
  })
  .query('query-no-input', {
    output: z.object({
      input: z.string(),
    }),
    resolve: () => {
      return { input: 'input' };
    },
  })
  .query('query-no-output', {
    input: z.string(),
    resolve: ({ input }) => {
      return { input };
    },
  })
  .mutation('mutation-string', {
    input: z.string(),
    output: z.object({
      input: z.string(),
    }),
    resolve: ({ input }) => {
      return { input };
    },
  })
  .mutation('mutation-object', {
    input: z.object({
      input: z.string(),
    }),
    output: z.object({
      input: z.string(),
    }),
    resolve: ({ input }) => {
      return { input: input.input };
    },
  })
  .mutation('mutation-no-input', {
    output: z.object({
      input: z.string(),
    }),
    resolve: () => {
      return { input: 'input' };
    },
  })
  .mutation('mutation-no-output', {
    input: z.object({
      input: z.string(),
    }),
    resolve: ({ input }) => {
      return { input: input.input };
    },
  });
