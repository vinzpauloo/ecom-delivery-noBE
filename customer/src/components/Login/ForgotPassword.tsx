import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

import styles from "./ForgotPassword.module.scss";
import constants from "../../utils/constants.json";
import { useCalculateHash } from "../../hooks/useCalculateHash";

import { useChangePass } from "../../hooks/useChangePass";

// Setup form schema & validation
interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().email(constants.form.error.email).required(),
  })
  .required();

interface ContainerProps {}

const ForgotPassword: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { calculateHash } = useCalculateHash();

  const { forgotPassword } = useChangePass();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      // START: Forgot password API
      console.log("forgotPassword", data);

      const response = await forgotPassword(data);
      console.log("reset PW", response);
      // END: Access password API
      navigate("/forgot-password2");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError("*" + err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error", err);
    }
  };

  return (
    <div className={styles.container}>
      <h4 className="mb-4">Reset Password</h4>

      <Form
        className={`text-center ${styles.form}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="mb-4 position-relative">
          <Form.Control
            size="lg"
            type="email"
            placeholder="Enter email"
            onKeyUp={() => setError("")}
            required
            {...register("email")}
          />
        </Form.Group>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="d-block w-100"
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
