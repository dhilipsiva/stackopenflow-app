import React from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-relay";
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
