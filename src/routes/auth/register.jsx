import React from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-relay";
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
  const [commit, isInFLight] = useMutation(mutation);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
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
      <button type="submit" disabled={isInFLight}>
        Register
      </button>
      <Link to={"/auth/login"}>Login?</Link>
    </form>
  );
};
export default Register;