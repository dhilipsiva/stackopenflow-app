import graphql from "babel-plugin-relay/macro";
import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Loader from "utils/loader";
import { useStoreActions } from "hooks";

const { useLazyLoadQuery } = require("react-relay");

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
  const data = JSON.stringify(useLazyLoadQuery(query));
  const setUser = useStoreActions((actions) => actions.setUser);
  useEffect(() => {
    setUser(data);
  }, []);
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* <Route path={`/questions`} component={QuestionRoutes}></Route> */}
          <Route path={`/questions`} render={() => <div>{data}</div>}></Route>
          {/* <Route path={`/settings`} component={SettingsRoutes}></Route> */}
          <Route path={"/"} render={() => <Redirect to={`/auth`} />} exact />
          <Route path={"*"} render={() => <Redirect to={`/`} />} exact />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Navigation;
