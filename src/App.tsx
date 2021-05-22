import Loader from "utils/loader";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AuthRoutes = lazy(() => import("routes/auth/routes"));
const Navigation = lazy(() => import("components/navigation"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/auth" component={AuthRoutes} />
          <Route path="/" component={Navigation} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
