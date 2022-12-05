import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignIn, useAuthUser } from "react-auth-kit";
import { useLogout } from "../../../hooks/useLogout";
import { useUser } from "../../../hooks/useUser";

import styles from "./ChangePasswordForm.module.scss";
import constants from "../../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  password: string;
  password_confirmation: string;
  current_password: string;
}

const schema = yup
  .object({
    password: yup.string().min(7, constants.form.error.passwordMin).required(),
    password_confirmation: yup
      .string()
      .min(7, constants.form.error.passwordMin)
      .required(),
    current_password: yup
      .string()
      .min(7, constants.form.error.passwordMin)
      .required(),
  })
  .required();

interface ContainerProps {}

const ChangePasswordForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();
  const auth = useAuthUser();
  const { changePassword } = useUser();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const onSubmit = async (data: IFormInputs) => {
    const response = await changePassword(data);
    console.log("changePassword response", response);

    if (response && !response.error) {
      const user = auth() || {};
      setMessage(response.message);

      // Re-login with new token
      signIn({
        token: response.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: user,
      });
    } else {
      setError(response?.error || "");
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Basic details */}
        <div className={`mx-4 mx-md-5 mx-lg-0 ${styles.formInnerContainer}`}>
          <h3 className="text-center">Change Password</h3>

          <Row className="mb-lg-3 mb-md-2">
            <Col md={{ span: 8, offset: 2 }} xs={{ span: 12, offset: 0 }}>
              <Form.Group className="position-relative">
                <Form.Label>Old password</Form.Label>
                <Form.Control
                  type="password"
                  onKeyUp={() => resetMessages()}
                  required
                  {...register("current_password")}
                />
              </Form.Group>

              <Form.Group className="position-relative">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  onKeyUp={() => resetMessages()}
                  required
                  {...register("password")}
                />
              </Form.Group>

              <Form.Group className="position-relative">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  type="password"
                  onKeyUp={() => resetMessages()}
                  required
                  {...register("password_confirmation")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="primary"
                className={styles.btnChangePass}
                onClick={() => navigate("/account")}
              >
                Back to Account
              </Button>
            </Col>
          </Row>

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{error}</p>
            <p>{errors.current_password?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.password_confirmation?.message}</p>
          </div>
        </div>

        {/* Success messages */}
        <p className="text-success">{message}</p>

        <div className="d-flex justify-content-center gap-5 mt-sm-5 mt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/account/orders")}
          >
            Orders
          </Button>

          <Button variant="primary" size="lg" type="submit" disabled={!isValid}>
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
