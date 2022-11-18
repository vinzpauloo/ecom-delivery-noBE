import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";

import styles from "./RegisterForm.module.scss";
import constants from "../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  address: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
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
    password: yup
      .string()
      .min(6, constants.form.error.passwordMin)
      .max(16, constants.form.error.passwordMax)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], constants.form.error.passwordConfirm)
      .required(),
  })
  .required();

interface ContainerProps {}

const RegisterForm: React.FC<ContainerProps> = ({}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMobile, setErrorMobile] = useState("");
  const navigate = useNavigate();
  const { validateEmail, validateMobile } = useValidate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

    // Set register data on local storage
    localStorage.setItem("registerUser", JSON.stringify(data));

    // Navigate to OTP page
    navigate("/otp");
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Basic details */}
        <div className={`mx-4 mx-md-5 mx-lg-0 ${styles.formInnerContainer}`}>
          <h3 className="text-center">Get started with FoodMonkey</h3>

          <Form.Group className="position-relative">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" required {...register("first_name")} />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" required {...register("last_name")} />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required {...register("email")} />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control
              type="text"
              placeholder="+639xxxxxxxxx"
              required
              {...register("mobile")}
              defaultValue="+63"
            />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required {...register("password")} />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              {...register("password_confirmation")}
            />
          </Form.Group>

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{errorEmail}</p>
            <p>{errorMobile}</p>
            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            <p>{errors.address?.message}</p>
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.password_confirmation?.message}</p>
          </div>
        </div>

        {/* Address details */}
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Enter Address</h3>

          <Form.Group className="position-relative">
            <Form.Label>Full Address</Form.Label>
            <Form.Control type="text" required {...register("address")} />
          </Form.Group>
        </div>

        <div
          className={`d-flex align-items-center justify-content-center ${styles.checkbox}`}
        >
          <Form.Check
            type="checkbox"
            id="terms"
            label="By continuing, you indicate that you read and agreed to terms of use"
            required
            onChange={() => setIsChecked(!isChecked)}
            checked={isChecked}
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="mt-4"
          disabled={!isValid || !isChecked}
        >
          Create Account
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
