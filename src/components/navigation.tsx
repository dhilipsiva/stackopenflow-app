import graphql from "babel-plugin-relay/macro";
import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Loader from "utils/loader";
import { useStoreActions, useStoreState } from "hooks";

const { useLazyLoadQuery } = require("react-relay");

// const QuestionRoutes = lazy(() => import("routes/questions/routes"));
// const SettingsRoutes = lazy(() => import("routes/settings/routes"));

const query = graphql`
  query navigationQuery {
    me {
      id
      username
    }
    contentTypes {
      id
      appLabel
      model
    }
  }
`;

const Navigation = () => {
  const data = useLazyLoadQuery(query);
  const setUser = useStoreActions((actions) => actions.setUser);
  const setContentTypes = useStoreActions((actions) => actions.setContentTypes);
  // const getContentTypeById = useStoreState((state) => state.getContentTypeById);
  // debugger;

  useEffect(() => {
    setUser(data.me);
    setContentTypes(data.contentTypes);
  }, []);
  // const contType = getContentTypeById(7);
  // debugger;

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* <Route path={`/questions`} component={QuestionRoutes}></Route> */}
          <Route path={`/questions`} render={() => <div>LoggedIn</div>}></Route>
          {/* <Route path={`/settings`} component={SettingsRoutes}></Route> */}
          <Route path={"/"} render={() => <Redirect to={`/auth`} />} exact />
          <Route path={"*"} render={() => <Redirect to={`/`} />} exact />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Navigation;
