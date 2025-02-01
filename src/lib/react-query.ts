/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<
  FnType extends (...args: unknown[]) => Promise<unknown>,
> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type QueryConfigTypeWithArgs<T extends (...args: any) => any> = {
  queryKey: ReturnType<T>['queryKey'];
  queryFn: ReturnType<T>['queryFn'];
};

export type MutationConfig<
  MutationFnType extends (...args: unknown[]) => Promise<unknown>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
