import React from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-relay";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";

const mutation = graphql`
  mutation registerMutation($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        username
      }
    }
  }
`;

const Register = (props) => {
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
          alert("Sucessfully registered. Please login now!");
          history.push("/auth/login");
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
      <h1 class="h3 mb-3 font-weight-normal">Please register to continue</h1>
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
        Register
      </Button>
      <LinkContainer to="/auth/login">
        <Button variant="secondary" size="sm" disabled={isInFlight} block>
          Login?
        </Button>
      </LinkContainer>
    </Form>
  );
};
export default Register;
