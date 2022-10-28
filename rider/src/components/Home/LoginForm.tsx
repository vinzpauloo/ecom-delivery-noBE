import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill, EnvelopeFill } from "react-bootstrap-icons";

import styles from "./LoginForm.module.scss";
import { useAuthContext } from "../../hooks/useAuthContext";

interface ContainerProps {}

const EyeIcon = ({ type }: { type: string }) => {
  return type === "password" ? (
    <EyeFill color="#8F887D" size={30} className={styles.icons} />
  ) : (
    <EyeSlashFill color="#8F887D" size={30} className={styles.icons} />
  );
};

const LoginForm: React.FC<ContainerProps> = ({}) => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = {
      isLoggedIn: true,
    };

    // Save the user to local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Update the auth context
    dispatch({ type: "LOGIN", payload: user });

    navigate("/account");
  };

  const handleTogglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <Form className={`text-center ${styles.form}`} onSubmit={handleSubmit}>
      <Form.Group className="mb-4 position-relative">
        <Form.Control
          id="email"
          size="lg"
          type="email"
          placeholder="Rider's username"
          // required
        />
        <EnvelopeFill color="#8F887D" size={40} className={styles.icons} />
      </Form.Group>

      <Form.Group className="mb-4 text-end position-relative">
        <Form.Control
          id="password"
          size="lg"
          type={passwordType}
          placeholder="Password"
          // required
          className="mb-2"
        />
        <Link to="#" onClick={handleTogglePasswordType}>
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
