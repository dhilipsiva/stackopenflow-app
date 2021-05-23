import React from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-relay";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";

const mutation = graphql`
  mutation loginMutation($input: ObtainJSONWebTokenInput!) {
    login(input: $input) {
      payload
      token
    }
  }
`;

const Login = (props) => {
  const history = useHistory();
  const [commit, isInFlight] = useMutation(mutation);
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
          window.localStorage.setItem("token", data.login.token);
          history.push("/questions");
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
    <Form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      {/*<img
        class="mb-4"
        src="/docs/4.6/assets/brand/bootstrap-solid.svg"
        alt=""
        width="72"
        height="72"
      />*/}
      <h1 class="h3 mb-3 font-weight-normal">Please login to continue</h1>
      <Form.Group className={errors.username ? "error" : ""}>
        <Form.Label htmlFor="username" srOnly>
          username
        </Form.Label>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Control
              type="text"
              className="mb-2"
              id="username"
              placeholder="username"
              {...field}
            />
          )}
        />
        <p>{errors.username}</p>
      </Form.Group>{" "}
      <Form.Group className={errors.password ? "error" : ""}>
        <Form.Label htmlFor="password" srOnly>
          password
        </Form.Label>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Control
              type="password"
              className="mb-2"
              id="password"
              placeholder="password"
              {...field}
            />
          )}
        />
        <p>{errors.password}</p>
      </Form.Group>
      <Button
        variant="primary"
        size="lg"
        type="submit"
        disabled={isInFlight}
        block
      >
        Login
      </Button>
      <LinkContainer to="/auth/register">
        <Button variant="secondary" size="sm" disabled={isInFlight} block>
          Register?
        </Button>
      </LinkContainer>
    </Form>
  );
};

export default Login;
