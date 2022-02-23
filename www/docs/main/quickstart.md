---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
slug: /quickstart
author: colinhacks
author_url: https://twitter.com/colinhacks
author_image_url: https://avatars.githubusercontent.com/u/3084745?v=4
---

:::tip
We highly encourage you to check out [the Example Apps](example-apps.md) to get a feel of tRPC and getting up & running as seamless as possible.
:::

:::caution
tRPC requires TypeScript > 4.1 as it relies on [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html).
:::

## Install Dependencies

**npm:**

```bash
npm install @trpc/server
```

**yarn:**

```bash
yarn add @trpc/server
```

## Define a Router

Let's walk through the steps of building a typesafe API with tRPC. To start, this API will only contain two endpoints:

```ts
getUser(id: string) => { id: string; name: string; }
createUser(data: {name:string}) => { id: string; name: string; }
```

### Create a Router Instance

First we define a router somewhere in our server codebase:

```ts
import * as trpc from '@trpc/server';
const appRouter = trpc.router();

// only export *type signature* of the router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;
```

### Add a Query Endpoint

Use the `query(name: string, params: QueryParams)` method to add a query endpoint to the router. Arguments:

- `name`: The name of this endpoint
- `params.input`: Optional. This should be a function that validates/casts the _input_ of this endpoint and either returns a strongly typed value (if valid) or throws an error (if invalid). Alternatively you can pass a [Zod](https://github.com/colinhacks/zod), [Superstruct](https://github.com/ianstormtaylor/superstruct) or [Yup](https://github.com/jquense/yup) schema.
- `params.resolve`: This is the actual implementation of the endpoint. It's a function with a single `req` argument. The validated input is passed into `req.input` and the context is in `req.ctx` (more about context later!)

```ts
import * as trpc from '@trpc/server';

const appRouter = trpc.router().query('getUser', {
  input: (val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  },
  async resolve(req) {
    req.input;
    return { id: req.input, name: 'Bilbo' };
  },
});

export type AppRouter = typeof appRouter;
```

### Add a Mutation Endpoint

Similar to GraphQL, tRPC makes a distinction between query and mutation endpoints. Let's add a `createUser` mutation:

```ts
import * as trpc from '@trpc/server';
import { z } from 'zod';

const appRouter = trpc
  .router()
  .query('getUser', {
    input: (val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    },
    async resolve(req) {
      req.input;
      return { id: req.input, name: 'Bilbo' };
    },
  })
  .mutation('createUser', {
    // validate input with Zod
    input: z.object({ name: z.string().min(5) }),
    async resolve(req) {
      // use your ORM of choice
      return await UserModel.create({
        data: req.input,
      });
    },
  });

export type AppRouter = typeof appRouter;
```

## Use the Power of Express/Fastify

If you already have an Express.js or Fastify.js server, you can use the corresponding adapters to convert a tRPC router to an express middleware or a fastify plugin.

- [Express.js Adapter](/docs/express)
- [Fastify.js Adapter](/docs/fastify)

## Next steps

tRPC includes more sophisticated client-side tooling designed for React projects generally and Next.js specifically. Read the appropriate guide next:

- [Usage with Next.js](/docs/nextjs)
- [Usage with React.js](/docs/react)
