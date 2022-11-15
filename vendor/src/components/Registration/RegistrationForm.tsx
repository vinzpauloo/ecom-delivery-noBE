import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";

import styles from "./RegistrationForm.module.scss";
import constants from "../../utils/constants.json";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";

// Setup form schema & validation
interface IFormInputs {
  mobile: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  address: string;
  contact_number: string;
}

const schema = yup
  .object({
    mobile: yup
      .string()
      .matches(/^\+(?:[0-9] ?){11,12}[0-9]$/, constants.form.error.mobile)
      .required(),
    password: yup
      .string()
      .min(6, constants.form.error.passwordMin)
      .max(16, constants.form.error.passwordMax)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], constants.form.error.passwordConfirm)
      .required(),
    first_name: yup
      .string()
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    email: yup.string().email(constants.form.error.email).required(),
    name: yup.string().min(2, constants.form.error.nameMin).required(),
    address: yup.string().required(),
    contact_number: yup
      .string()
      .matches(
        /^\+(?:[0-9] ?){11,12}[0-9]$/,
        constants.form.error.contact_number
      )
      .required(),
  })
  .required();

interface ContainerProps {}

const RegistrationForm: React.FC<ContainerProps> = ({}) => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMobile, setErrorMobile] = useState("");
  const navigate = useNavigate();
  const { validateEmail, validateMobile } = useValidate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log("onSubmit", data);

    // Validate email
    console.log("validating email ...");
    const responseEmail = await validateEmail({ email: data.email });

    // Validate email
    console.log("validating mobile ...");
    const responseMobile = await validateMobile({ mobile: data.mobile });

    console.log("responseEmail", responseEmail);
    console.log("responseMobile", responseMobile);

    if (!responseEmail.isValid) {
      setErrorEmail(responseEmail.error);
      return;
    } else {
      setErrorEmail("");
    }

    if (!responseMobile.isValid) {
      setErrorMobile(responseMobile.error);
      return;
    } else {
      setErrorMobile("");
    }

    // Set Register data on local storage
    localStorage.setItem("registerUser", JSON.stringify(data));

    // Navigate to OTP page
    navigate("/otp");
  };

  return (
    <div>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Get started with FoodMonkey</h3>

          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  required
                  {...register("first_name")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  required
                  {...register("last_name")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Contact Number (+639xxxxxxxxx)"
                  required
                  {...register("mobile")}
                  defaultValue="+63"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  {...register("email")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  {...register("password")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  {...register("password_confirmation")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.password_confirmation?.message}</p>
            <p>{errors.name?.message}</p>
            <p>{errors.address?.message}</p>
            <p>{errors.contact_number?.message}</p>
          </div>
        </div>

        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Restaurant Infromations</h3>

          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Restaurant Name"
                  required
                  {...register("name")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Full Address"
                  required
                  {...register("address")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Contact Number (+639xxxxxxxxx)"
                  required
                  {...register("contact_number")}
                  defaultValue="+63"
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div
          className={`position-relative d-flex align-items-center justify-content-center ${styles.checkbox}`}
        >
          <Form.Check
            type="checkbox"
            id="terms"
            label="By continuing, you indicate that you read and agreed to terms of use"
            required
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="mt-4"
          disabled={!isDirty || !isValid}
        >
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
