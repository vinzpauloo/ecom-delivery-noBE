import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";

import styles from "./ForgotPassword2.module.scss";
import constants from "../../utils/constants.json";
import { useCalculateHash } from "../../hooks/useCalculateHash";

import { useChangePass } from "../../hooks/useChangePass";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import saveSuccess from "../../assets/save-success.json";
import { useSignIn } from "react-auth-kit";

// Setup form schema & validation
interface IFormInputs {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

const schema = yup
  .object({
    email: yup.string().email(constants.form.error.email).required(),
  })
  .required();

interface ContainerProps {}

const ResetPasswordSuccessModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4`}>
          <Lottie animationData={saveSuccess} loop={true} />
          <p className="mt-4" style={{ fontWeight: "400" }}>
            Reset Password Successful
          </p>

          <Link
            to="/login"
            className={`d-inline-block mt-2`}
            style={{
              background: "#e6b325",
              border: "none",
              borderRadius: "5px",
              color: "black",
              fontSize: "16px",
              fontWeight: "300",
              width: "180px",
              padding: "6px",
              textDecoration: "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Go to Login Page
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ForgotPassword2: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const { resetPassword } = useChangePass();
  const signIn = useSignIn();

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
      const withTypeData = { ...data, type: "Customer" };

      const response = await resetPassword(withTypeData);
      // console.log("reset PW", response);
      // END: Access password API

      if (response.error) {
        // Prepare errors
        let arrErrors: string[] = [];
        for (let value of Object.values(response.error)) {
          arrErrors.push("" + value);
        }
        setApiErrors(arrErrors);
      } else {
        setModal(true);
        // signIn({
        //   token: response.token,
        //   expiresIn: 3600,
        //   tokenType: "Bearer",
        //   authState: response.user,
        // });
      }
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError("*" + err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      // console.log("Error", err);
    }
  };

  const [modal, setModal] = useState(false);

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

        <Form.Group className="mb-4 position-relative">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter reset code"
            onKeyUp={() => setError("")}
            required
            {...register("token")}
          />
        </Form.Group>

        <Form.Group className="mb-4 position-relative">
          <Form.Control
            size="lg"
            type="password"
            placeholder="Enter new password"
            onKeyUp={() => setError("")}
            required
            {...register("password")}
          />
        </Form.Group>

        <Form.Group className="mb-4 position-relative">
          <Form.Control
            size="lg"
            type="password"
            placeholder="Confirm new password"
            onKeyUp={() => setError("")}
            required
            {...register("password_confirmation")}
          />
        </Form.Group>

        {/* Error messages */}
        <div className={styles.errors}>
          <p>{apiErrors} </p>
          <p>{error} </p>
          <p>{errors.email?.message} </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="d-block w-100"
        >
          Reset Password
        </Button>
        <ResetPasswordSuccessModal
          show={modal}
          onHide={() => setModal(false)}
        />
      </Form>
    </div>
  );
};

export default ForgotPassword2;
