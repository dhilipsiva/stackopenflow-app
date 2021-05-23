import graphql from "babel-plugin-relay/macro";
import React, { Suspense, useEffect, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loader from "utils/loader";
import { useStoreActions } from "easy-peasy";
const { useLazyLoadQuery } = require("react-relay");
const QuestionRoutes = lazy(() => import("routes/questions/routes"));

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

  useEffect(() => {
    setUser(data.me);
    setContentTypes(data.contentTypes);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={"/questions"} component={QuestionRoutes}></Route>
          <Route path={"/"} render={() => <Redirect to={`/auth`} />} exact />
          <Route path={"*"} render={() => <Redirect to={`/`} />} exact />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Navigation;
