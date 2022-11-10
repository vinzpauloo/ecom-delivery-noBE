import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill, EnvelopeFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";

import styles from "./LoginForm.module.scss";
import constants from "../../utils/constants.json";

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
  const [authKitIsAuthenticated, setAuthKitIsAuthenticated] = useState(false);
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const [passwordType, setPasswordType] = useState(
    constants.form.inputType.password
  );
  const navigate = useNavigate();

  useEffect(() => {
    setAuthKitIsAuthenticated(isAuthenticated());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      // START: Access login API
      const url = process.env.REACT_APP_API_LOCAL + "/login";
      const options = {
        headers: {
          Accept: process.env.REACT_APP_HEADER_ACCEPT_VND,
          "Content-Type": process.env.REACT_APP_HEADER_ACCEPT_VND,
        },
        withCredentials: true,
      };

      const response = await axios.post(url, data, options);
      // END: Access login API

      if (response.status === 200) {
        const { data } = response.data;

        signIn({
          token: data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: data.user,
        });

        navigate("/");
      }
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError("*" + err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error", err);
    }
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
      {/* IsAuthenticated test */}
      {/* <div className="text-start">
        {authKitIsAuthenticated ? (
          <p className="text-success">User is authenticated.</p>
        ) : (
          <p className="text-danger">User is not authenticated.</p>
        )}
      </div> */}

      <Form.Group className="mb-4 position-relative">
        <Form.Control
          size="lg"
          type="email"
          placeholder="Email or number"
          onKeyUp={() => setError("")}
          required
          {...register("email")}
        />
        <EnvelopeFill
          color={constants.color.gray}
          size={30}
          className={styles.icons}
        />
      </Form.Group>

      <Form.Group className="mb-2 position-relative">
        <Form.Control
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
      </Form.Group>

      <div className="mb-5 position-relative text-end">
        <Link to="#" className={styles.forgotPassword}>
          Forgot Password?
        </Link>

        {/* Error messages */}
        <div className={styles.errors}>
          <p>{error}</p>
          <p>{errors.email?.message}</p>
          <p>{errors.password?.message}</p>
        </div>
      </div>

      <Button variant="primary" size="lg" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
