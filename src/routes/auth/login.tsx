import React from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-relay";

const mutation = graphql`
  mutation loginMutation($input: ObtainJSONWebTokenInput!) {
    login(input: $input) {
      payload
      token
    }
  }
`;

type LoginForm = {
  username: string;
  password: string;
};

const Login = (props: any) => {
  const history = useHistory();
  const [commit, isInFlight] = useMutation(mutation);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    commit({
      variables: { input: data },
      onCompleted: (data: any, errors: any) => {
        if (errors === null) {
          window.localStorage.setItem("token", data.login.token);
          history.push("/questions");
        } else {
          errors.map((error: any) => alert(error.message));
        }
      },
      onError: (errors: any) => {
        alert(errors);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <p>Please Enter your credentials</p>
      <div className={errors.username ? "error" : ""}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="dhilipsiva@pm.me"
          {...register("username", { required: true })}
        />
        <p>{errors.username}</p>
      </div>
      <div className={errors.password ? "error" : ""}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        <p>{errors.password}</p>
      </div>
      <button type="submit" disabled={isInFlight}>
        Login
      </button>
      <Link to={"/auth/register"}>Register?</Link>
    </form>
  );
};

export default Login;
