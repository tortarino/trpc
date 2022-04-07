import type { Procedure } from '@trpc/server/dist/declarations/src/internals/procedure';
import type {
  ProcedureRecord,
  Router,
} from '@trpc/server/dist/declarations/src/router';
import type { TRPCErrorShape } from '@trpc/server/dist/declarations/src/rpc/envelopes';
import type { Subscription } from '@trpc/server/dist/declarations/src/subscription';

export type TRPCRouter<TInputContext = any, TContext = any> = Router<
  TInputContext,
  TContext,
  ProcedureRecord<TInputContext, TContext, any, any, any, any>,
  ProcedureRecord<TInputContext, TContext, any, any, any, any>,
  ProcedureRecord<
    TInputContext,
    TContext,
    unknown,
    unknown,
    Subscription<unknown>,
    unknown
  >,
  TRPCErrorShape
>;

export type TRPCProcedure = Procedure<any, any, any, any, any, any>;
