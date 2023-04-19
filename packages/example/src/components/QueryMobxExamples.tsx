import { QueryClient, QueryObserver } from "@tanstack/query-core";
import { observer, useLocalObservable } from "mobx-react";
import { ObservableFactory, makeBaseObservableQuery } from "query-mobx";

import { useRenderCount } from "../utils";

const queryClient = new QueryClient();
queryClient.mount();

const factory = new ObservableFactory(queryClient);

export const QueryMobxSimple = observer(() => {
  const renderCount = useRenderCount();

  const observable = useLocalObservable(() =>
    makeBaseObservableQuery(
      queryClient,
      {
        queryKey: ["/QueryMobxSimple"],
        queryFn: () => new Promise<number>((r) => setTimeout(() => r(42), 500)),
      },
      QueryObserver
    )
  );

  return (
    <div>
      <h1>QueryMobxSimple</h1>
      <div>Rendered:{renderCount}</div>
      <div>{`${observable.result.status}:${observable.result.fetchStatus}:${observable.result.data}`}</div>
      <button onClick={() => observable.queryObserver.refetch()}>
        refetch
      </button>
    </div>
  );
});

export const QueryMobxRenderCount = observer(() => {
  const renderCount = useRenderCount();

  const observable = useLocalObservable(() =>
    makeBaseObservableQuery(
      queryClient,
      {
        queryKey: ["/QueryMobxRenderCount"],
        queryFn: () => new Promise<number>((r) => setTimeout(() => r(43), 500)),
      },
      QueryObserver
    )
  );

  return (
    <div>
      <h1>QueryMobxRenderCount</h1>
      <div>Rendered:{renderCount}</div>
      <div>Data:{JSON.stringify(observable.result.data)}</div>
      <button onClick={() => observable.queryObserver.refetch()}>
        refetch
      </button>
    </div>
  );
});

export const QueryMobxFactory = observer(() => {
  const renderCount = useRenderCount();

  const observableResult = useLocalObservable(() =>
    factory.makeQuery({
      queryKey: ["/QueryMobxFactory"],
      queryFn: () => new Promise<number>((r) => setTimeout(() => r(43), 500)),
    })
  );

  return (
    <div>
      <h1>QueryMobxFactory</h1>
      <div>Rendered:{renderCount}</div>
      <div>{`${observableResult.status}:${observableResult.fetchStatus}:${observableResult.data}`}</div>
      <button onClick={() => observableResult.refetch()}>refetch</button>
    </div>
  );
});

export const QueryMobxExamples = () => {
  return (
    <>
      <QueryMobxSimple />
      <QueryMobxRenderCount />
      <QueryMobxFactory />
    </>
  );
};
