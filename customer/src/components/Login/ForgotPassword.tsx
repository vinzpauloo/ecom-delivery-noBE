import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useChangePass } from "../../hooks/useChangePass";

import styles from "./ForgotPassword.module.scss";
import constants from "../../utils/constants.json";

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
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    const withTypeData = { ...data, type: "Customer" };
    console.log("forgotPassword", withTypeData);

    const response = await forgotPassword(withTypeData);
    console.log("reset PW", response);

    if (response.error) {
      // Prepare errors
      setIsLoading(false);
      let arrErrors: string[] = [];
      for (let value of Object.values(response.error)) {
        arrErrors.push("" + value);
      }
      setApiErrors(arrErrors);
    } else {
      navigate("/forgot-password2");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h4 className="mb-4">Reset Password</h4>

        <Form
          className={`text-center ${styles.form}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-0 position-relative">
            <Form.Control
              size="lg"
              type="email"
              placeholder="Enter email"
              onKeyUp={() => setError("")}
              required
              {...register("email")}
              disabled={isLoading}
            />
          </Form.Group>

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{apiErrors} </p>
            <p>{error} </p>
            <p>{errors.email?.message} </p>
          </div>

          {!isLoading ? (
            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="d-block w-100"
            >
              Reset Password
            </Button>
          ) : (
            <Button className={styles.spinnerBtn} variant="warning">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp; Please Wait...
            </Button>
          )}
        </Form>
      </div>

      {/* <Modal
        show={true}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex justify-content-center">
          
        </div>
      </Modal> */}
    </>
  );
};

export default ForgotPassword;
