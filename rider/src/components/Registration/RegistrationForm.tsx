import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import useHistory from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";

import styles from "./RegistrationForm.module.scss";
import constants from "../../utils/constants.json";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import RiderProfile from "../../assets/images/riderprofile.png";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  // full_name: string;
  address: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
  license_number: string;
  license_expiration: string;
}

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    // full_name: yup.string().min(2, constants.form.error.fullNameMin).required(),
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
    license_number: yup.string().required(),
    license_expiration: yup.string().required(),
  })
  .required();

interface ContainerProps {}

const RegistrationForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMobile, setErrorMobile] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { validateEmail, validateMobile } = useValidate();
  const Continue = (e: any) => {
    e.preventDefault();
    navigate("/registration2");
  };

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
    const responseEmail = await validateEmail({ email: data.email });

    // Validate mobile
    const responseMobile = await validateMobile({ mobile: data.mobile });

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
    localStorage.setItem("oldRegisterUser", JSON.stringify(data));

    // Navigate to OTP page
    navigate("/registration2");
  };

  return (
    <div>
      <div className="d-flex d-lg-none justify-content-center mb-4">
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={LogoHeader}
              alt="Food Monkey Logo"
              className={styles.logoMain}
            />
            <img
              src={LogoHeaderHover}
              alt="Food Monkey Logo"
              className={styles.logoHover}
            />
          </Link>
        </div>
      </div>

      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Personal Information</h3>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  {...register("first_name")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required {...register("last_name")} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  required
                  {...register("address")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+639xxxxxxxxx"
                  required
                  {...register("mobile")}
                  defaultValue="+63"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required {...register("email")} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  {...register("password")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  {...register("password_confirmation")}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Driver's License Number</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("license_number")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Driver's License Expiration</Form.Label>
                <Form.Control
                  className="mb-0"
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("license_expiration")}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Error messages */}
        <div className={styles.errors}>
          <p>{errorEmail}</p>
          <p>{errorMobile}</p>
          <p>{errors.address?.message}</p>
          {/* <p>{errors.last_name?.message}</p> */}
          <p>{errors.address?.message}</p>
          <p>{errors.mobile?.message}</p>
          <p>{errors.email?.message}</p>
          <p>{errors.password?.message}</p>
          <p>{errors.password_confirmation?.message}</p>
          <p>{errors.license_number?.message}</p>
          <p>{errors.license_expiration?.message}</p>
        </div>

        <hr className="d-none d-lg-block" />

        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <img src={RiderProfile} className="w-25 img-fluid mb-3" />
          <Row className="">
            <Col sm={2} md={8}>
              <input
                placeholder="Profile Picture (PDF*JPG*PNG)"
                className={`bg-white ${styles.test}`}
                disabled
              />
            </Col>
            <Col>
              <a className={`${styles.test2}`}>Browse File</a>
            </Col>
          </Row>
          <Row className="">
            <Col sm={2} md={8}>
              <input
                placeholder="Driver’s License Image (PDF*JPG*PNG)"
                className={`bg-white ${styles.test}`}
                disabled
              />
            </Col>
            <Col>
              <a className={`${styles.test2}`}>Browse File</a>
            </Col>
          </Row>
          <div className="nextBtn">
            {/* <Link to="/registration2">
            
          </Link> */}
            <Button
              variant="warning"
              size="lg"
              type="submit"
              className="mt-4"
              id="nextBtn-2"
              // href="/registration2"
              // onClick={Continue}
            >
              Next
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
