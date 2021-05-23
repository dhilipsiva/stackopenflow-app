import Loader from "utils/loader";
import React, { lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Login = lazy(() => import("routes/auth/login"));
const Register = lazy(() => import("routes/auth/register"));

const Routes = () => {
  let { path, url } = useRouteMatch();
  return (
    <Container className="text-center">
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={`${path}/login`} component={Login} exact />
          <Route path={`${path}/register`} component={Register} exact />
          <Route
            path={path}
            component={() => <Redirect to={`${url}/login`} />}
            exact
          />
        </Switch>
      </Suspense>
    </Container>
  );
};
export default Routes;
