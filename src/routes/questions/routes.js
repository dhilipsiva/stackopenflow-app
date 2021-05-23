import Loader from "utils/loader";
import React, { lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

const List = lazy(() => import("routes/questions/list"));
const Detail = lazy(() => import("routes/questions/detail"));

const Routes = () => {
  let { path, url } = useRouteMatch();

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={path} component={List} exact />
        <Route path={`${path}/:questionId`} component={Detail} exact />
      </Switch>
    </Suspense>
  );
};

export default Routes;
