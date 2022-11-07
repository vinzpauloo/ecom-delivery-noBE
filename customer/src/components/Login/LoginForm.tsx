import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill, EnvelopeFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useSignIn } from "react-auth-kit";

import styles from "./LoginForm.module.scss";
import constants from "../../utils/constants.json";
// import { useAuthContext } from "../../hooks/useAuthContext";

// Setup form schema & validation
interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email(constants.form.error.email).required(),
    password: yup
      .string()
      .min(6, constants.form.error.passwordMin)
      .max(16, constants.form.error.passwordMax)
      .required(),
  })
  .required();

interface ContainerProps {}

const EyeIcon = ({ type }: { type: string }) => {
  return type === constants.form.inputType.password ? (
    <EyeFill color={constants.color.gray} size={30} className={styles.icons} />
  ) : (
    <EyeSlashFill
      color={constants.color.gray}
      size={30}
      className={styles.icons}
    />
  );
};

const LoginForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const [passwordType, setPasswordType] = useState(
    constants.form.inputType.password
  );
  const navigate = useNavigate();
  // const { dispatch } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    await axios
      .get(process.env.REACT_APP_BASE + "/sanctum/csrf-cookie")
      .then((response) => {
        console.log(response);
        console.log(response.headers["Set-Cookie"]);
        console.log(response.headers["X-XSRF-TOKEN"]);

        // try {
        //   const url = process.env.REACT_APP_API_LOCAL + "/login";
        //   const options = {
        //     headers: {
        //       Accept: process.env.REACT_APP_HEADER_ACCEPT_VND,
        //       "Content-Type": process.env.REACT_APP_HEADER_ACCEPT_VND,

        //     },
        //   };

        //   console.log("Sample post from /api/login");
        //   console.log("url", url);
        //   console.log("options", options);
        //   console.log("data", data);

        //   const response = axios.post(url, data, options);

        //   console.log("Logging response ...");
        //   console.log(response);

        //   // signIn({
        //   //   token: response.data.token,
        //   //   expiresIn: 3600,
        //   //   tokenType: "Bearer",
        //   //   authState: { email: data.email },
        //   // });
        // } catch (err) {
        //   if (err && err instanceof AxiosError)
        //     setError(err.response?.data.message);
        //   else if (err && err instanceof Error) setError(err.message);

        //   console.log("Error", err);
        // }
      });

    // const user = {
    //   isLoggedIn: true,
    // };

    // // Save the user to local storage
    // localStorage.setItem("user", JSON.stringify(user));

    // // Update the auth context
    // dispatch({ type: "LOGIN", payload: user });

    // navigate("/");
  };

  const onTogglePasswordType = () => {
    if (passwordType === constants.form.inputType.password) {
      setPasswordType(constants.form.inputType.text);
      return;
    }
    setPasswordType(constants.form.inputType.password);
  };

  return (
    <Form
      className={`text-center ${styles.form}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Error messages */}
      <div className={styles.errors}>
        <p>{errors.email?.message}</p>
        <p>{errors.password?.message}</p>
      </div>

      <Form.Group className="mb-4 position-relative">
        <Form.Control
          id="email"
          size="lg"
          type="email"
          placeholder="Email or number"
          required
          {...register("email")}
        />
        <EnvelopeFill
          color={constants.color.gray}
          size={30}
          className={styles.icons}
        />
      </Form.Group>

      <Form.Group className="mb-4 text-end position-relative">
        <Form.Control
          id="password"
          size="lg"
          type={passwordType}
          placeholder="Enter Password"
          className="mb-2"
          required
          {...register("password")}
        />
        <Link to="#" onClick={onTogglePasswordType}>
          <EyeIcon type={passwordType} />
        </Link>
        <Link to="#" className={styles.forgotPassword}>
          Forgot Password?
        </Link>
      </Form.Group>

      <Button variant="primary" size="lg" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
