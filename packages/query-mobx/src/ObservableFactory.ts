import type { QueryClient, QueryKey } from "@tanstack/query-core";
import { QueryObserver } from "@tanstack/query-core";

import { makeBaseObservableQuery } from "./makeBaseObservableQuery";
import type { ObservableQueryOptions } from "./types";

export class ObservableFactory {
  constructor(public queryClient: QueryClient) {}

  makeQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >(options: ObservableQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
    return makeBaseObservableQuery(this.queryClient, options, QueryObserver)
      .result;
  }
}
