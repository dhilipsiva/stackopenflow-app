import graphql from "babel-plugin-relay/macro";
import React, { Suspense, useEffect, lazy, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loader from "utils/loader";
import { useStoreActions, useStoreState } from "easy-peasy";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import NewQuestionModal from "components/new-question-modal";

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
  // NOTE: in real world-aplications, one would simply `usePreloadedQuery`
  const data = useLazyLoadQuery(query);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setUser = useStoreActions((actions) => actions.setUser);
  const setContentTypes = useStoreActions((actions) => actions.setContentTypes);

  useEffect(() => {
    setUser(data.me);
    setContentTypes(data.contentTypes);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const user = useStoreState((state) => state.user);

  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">StackOpenflow</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/questions">
                  <Nav.Link href="#home">Questions</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav className="mr-auto">
                <Button variant="primary" onClick={handleShow}>
                  + Question
                </Button>
                <NewQuestionModal show={show} handleClose={handleClose} />
              </Nav>
              <Nav className="mr-auto">
                <Navbar.Text>Welcome, {user && user.username}!</Navbar.Text>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={"/questions"} component={QuestionRoutes}></Route>
              <Route
                path={"/"}
                render={() => <Redirect to={`/auth`} />}
                exact
              />
              <Route path={"*"} render={() => <Redirect to={`/`} />} exact />
            </Switch>
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
};

export default Navigation;
