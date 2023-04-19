import type {
  QueryKey,
  QueryObserver,
  QueryClient,
} from "@tanstack/query-core";

import { ObservableQuery } from "./ObservableQuery";
import { ObservableQueryOptions } from "./types";

export const makeBaseObservableQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryClient: QueryClient,
  options: ObservableQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  Observer: typeof QueryObserver
) => {
  return new ObservableQuery(queryClient, options, Observer);
};
