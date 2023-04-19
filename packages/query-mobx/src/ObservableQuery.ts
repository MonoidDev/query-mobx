import {
  DefaultedQueryObserverOptions,
  QueryKey,
  QueryObserver,
  QueryObserverOptions,
  QueryObserverResult,
} from "@tanstack/query-core";
import type { QueryClient } from "@tanstack/query-core";
import { makeObservable, observable, action } from "mobx";

import { replaceShallow } from "./utils";

export class ObservableQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey
> {
  result!: QueryObserverResult<TData, TError>;
  defaultedOptions: DefaultedQueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >;
  queryObserver: QueryObserver<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >;
  unsubscribe: () => void;

  constructor(
    public queryClient: QueryClient,
    public options: QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
    public Observer: typeof QueryObserver
  ) {
    this.defaultedOptions = queryClient.defaultQueryOptions(options);

    // Tracking props visit should be done in MobX, by default.
    this.defaultedOptions.notifyOnChangeProps =
      options.notifyOnChangeProps ??
      queryClient.getDefaultOptions().queries?.notifyOnChangeProps ??
      "all";

    this.queryObserver = new Observer(queryClient, this.defaultedOptions);
    this.updateResult();
    this.unsubscribe = this.queryObserver.subscribe(() => {
      this.updateResult();
    });

    makeObservable(this, {
      result: observable,
      updateResult: action,
    });
  }

  /**
   * Modify this result so it matches the tanstack query result.
   */
  updateResult() {
    const nextResult = this.queryObserver.getOptimisticResult(
      this.defaultedOptions
    );
    this.result = this.result ?? {};

    replaceShallow(this.result, nextResult);
  }

  destroy() {
    this.unsubscribe();
  }
}
