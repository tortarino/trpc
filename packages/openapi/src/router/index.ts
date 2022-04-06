import { TRPCRouter } from '@trpc/server';
import type { OpenApiCompliantRouter } from '../types';

export const router = <TContext>() => {
  return new TRPCRouter() as OpenApiCompliantRouter<TContext>;
};
