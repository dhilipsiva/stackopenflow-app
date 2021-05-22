import Loader from "utils/loader";
import graphql from "babel-plugin-relay/macro";
import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

// const QuestionRoutes = lazy(() => import("routes/questions/routes"));
// const SettingsRoutes = lazy(() => import("routes/settings/routes"));

const query = graphql`
  query navigationQuery {
    me {
      id
      username
    }
  }
`;

const Navigation = () => {
  // TODO: me query
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* <Route path={`/questions`} component={QuestionRoutes}></Route> */}
          {/* <Route path={`/settings`} component={SettingsRoutes}></Route> */}
          <Route path={"*"} render={() => <Redirect to={`/`} />} exact />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Navigation;
