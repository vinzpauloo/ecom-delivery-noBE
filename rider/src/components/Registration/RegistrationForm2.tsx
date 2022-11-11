import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./RegistrationForm2.module.scss";
import constants from "../../utils/constants.json";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import RiderProfile from "../../assets/images/riderprofile.png";
import Bike1 from "../../assets/images/bike1.png";
import Bike2 from "../../assets/images/bike2.png";
import Bike3 from "../../assets/images/bike3.png";
import Bike4 from "../../assets/images/bike4.png";

// Setup form schema & validation
interface IFormInputs {
  // first_name: string;
  // last_name: string;
  // address: string;
  // mobile: string;
  // email: string;
  // password: string;
  // password_confirmation: string;
  brand: string;
  model: string;
  year: string;
  or_number: string;
  plate_number: string;
}

const schema = yup
  .object({
    // first_name: yup
    //   .string()
    //   .min(2, constants.form.error.firstNameMin)
    //   .required(),
    // last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    // address: yup.string().required(),
    // mobile: yup
    //   .string()
    //   .matches(/^\+(?:[0-9] ?){11,12}[0-9]$/, constants.form.error.mobile)
    //   .required(),
    // email: yup.string().email(constants.form.error.email).required(),
    // password: yup
    //   .string()
    //   .min(6, constants.form.error.passwordMin)
    //   .max(16, constants.form.error.passwordMax)
    //   .required(),
    // password_confirmation: yup
    //   .string()
    //   .oneOf([yup.ref("password"), null], constants.form.error.passwordConfirm)
    //   .required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    year: yup.string().required(),
    or_number: yup.string().required(),
    plate_number: yup.string().required(),
  })
  .required();

interface ContainerProps {}

const RegistrationForm2: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    let items = JSON.parse(localStorage.getItem("oldRegisterUser") || "");
    const merged = { ...items, ...data };

    // Set register data on local storage
    localStorage.setItem(`registerUser`, JSON.stringify(merged));

    // Navigate to OTP page
    navigate("/otp");
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
          <h3 className="text-center">Vehicle Informations</h3>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("brand")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("model")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("year")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>OR number</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("or_number")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Plate number</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("plate_number")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{errors.brand?.message}</p>
            <p>{errors.model?.message}</p>
            <p>{errors.year?.message}</p>
            <p>{errors.or_number?.message}</p>
            <p>{errors.plate_number?.message}</p>

            {/* Errors from backend */}
            {multipleErrors.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>

          <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
            <img src={Bike1} alt="" />
            <img src={Bike2} alt="" />
            <img src={Bike3} alt="" />
            <img src={Bike4} alt="" />
          </div>
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
          variant="warning"
          size="lg"
          type="submit"
          className="mt-4"
          id="nextBtn-2"
        >
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm2;
