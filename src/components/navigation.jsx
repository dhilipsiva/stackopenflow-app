import graphql from "babel-plugin-relay/macro";
import React, { Suspense, useEffect, lazy, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Loader from "utils/loader";
import { useStoreActions, useStoreState } from "easy-peasy";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useMutation } from "react-relay";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";

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

const mutation = graphql`
  mutation navigationNewQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        id
      }
    }
  }
`;

const NewQuestionModal = ({ show, handleClose }) => {
  const [commit, isInFlight] = useMutation(mutation);
  const history = useHistory();
  const refresh = useStoreActions((actions) => actions.refresh);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    commit({
      variables: { input: data },
      onCompleted: (data, errors) => {
        if (errors === null) {
          refresh();
          history.push(`/questions/${data.createQuestion.question.id}`);
          handleClose();
        } else {
          errors.map((error) => alert(error.message));
        }
      },
      onError: (errors) => {
        alert(errors);
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Question</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {/*<img
        class="mb-4"
        src="/docs/4.6/assets/brand/bootstrap-solid.svg"
        alt=""
        width="72"
        height="72"
      />*/}
          <Form.Group className={errors.title ? "error" : ""}>
            <Form.Label htmlFor="question-title" srOnly>
              Question Title
            </Form.Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  className="mb-2"
                  id="question-title"
                  placeholder="Question Title"
                  {...field}
                />
              )}
            />
            <p>{errors.title}</p>
          </Form.Group>{" "}
          <Form.Group className={errors.text ? "error" : ""}>
            <Form.Label htmlFor="question-text" srOnly>
              Question Text
            </Form.Label>
            <Controller
              name="text"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  as="textarea"
                  className="mb-2"
                  id="question-text"
                  placeholder="Question Text"
                  {...field}
                />
              )}
            />
            <p>{errors.text}</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isInFlight}
          >
            Close
          </Button>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={isInFlight}
            block
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

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
