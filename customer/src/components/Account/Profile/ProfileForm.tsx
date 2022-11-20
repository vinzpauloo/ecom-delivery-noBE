import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";

import styles from "./ProfileForm.module.scss";
import constants from "../../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  address: string;
  mobile: string;
  email: string;
}

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    address: yup.string().required(),
    mobile: yup
      .string()
      .matches(/^\+(?:[0-9] ?){11,12}[0-9]$/, constants.form.error.mobile)
      .required(),
    email: yup.string().email(constants.form.error.email).required(),
  })
  .required();

interface ContainerProps {}

const ProfileForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { getUser, updateUser } = useUser();
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
    console.log("Requesting updateUser ...");

    const response = await updateUser(data);
    console.log("updateUser response", response);

    if (!response.error) {
      setMessage(constants.form.success.updateProfile);
    } else {
      setError(response.error);
    }
  };

  // Get user request
  const handleGetUser = async () => {
    console.log("Requesting getUser ...");

    const response = await getUser();
    console.log("handleGetUser response", response);
    let defaultValues = {
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      mobile: response.mobile,
      address: response.address[0]?.address,
    };

    reset(defaultValues);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Basic details */}
        <div className={`mx-4 mx-md-5 mx-lg-0 ${styles.formInnerContainer}`}>
          <h3 className="text-center">My Account</h3>

          <Row md={2} xs={1} className="mb-lg-3 mb-md-2">
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  required
                  {...register("first_name")}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  required
                  {...register("last_name")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row md={2} xs={1} className="mb-lg-3 mb-md-2">
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  {...register("email")}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  type="text"
                  required
                  {...register("mobile")}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{error}</p>
            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            <p>{errors.address?.message}</p>
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
          </div>
        </div>

        {/* Address details */}
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Enter Address</h3>

          <Form.Group className="position-relative">
            <Form.Label>Full Address</Form.Label>
            <Form.Control
              type="text"
              onKeyUp={() => resetMessages()}
              required
              {...register("address")}
            />
          </Form.Group>
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
            Save Info
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProfileForm;
