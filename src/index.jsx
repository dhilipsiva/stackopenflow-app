import ReactDOM from "react-dom";
import React, { lazy, Suspense } from "react";
import { createStore, StoreProvider } from "easy-peasy";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import "index.scss";
import RelayEnvironment from "utils/relay-env";
import storeModel from "store";
import Loader from "utils/loader";
import reportWebVitals from "reportWebVitals";

const store = createStore(storeModel);
const LazyApp = lazy(() => import("App"));

const AppRoot = (
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <StoreProvider store={store}>
        <Suspense fallback={<Loader />}>
          <LazyApp />
        </Suspense>
      </StoreProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>
);

ReactDOM.render(AppRoot, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
