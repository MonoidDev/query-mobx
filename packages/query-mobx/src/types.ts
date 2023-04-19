import { QueryKey, QueryObserverOptions } from "@tanstack/query-core";

export interface ObservableQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> extends QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  > {}
