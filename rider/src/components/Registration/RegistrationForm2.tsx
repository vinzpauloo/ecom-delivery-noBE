import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RegistrationForm2.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import RiderProfile from "../../assets/images/riderprofile.png";
import Bike1 from "../../assets/images/bike1.png";
import Bike2 from "../../assets/images/bike2.png";
import Bike3 from "../../assets/images/bike3.png";
import Bike4 from "../../assets/images/bike4.png";

const RegistrationForm2 = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
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

      <Form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Vehicle Informations</h3>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Brand</Form.Label>
                <Form.Control id="model" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Model</Form.Label>
                <Form.Control id="make" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Year</Form.Label>
                <Form.Control id="year" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>OR number</Form.Label>
                <Form.Control id="plate_number" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Plate number</Form.Label>
                <Form.Control
                  className="mb-0"
                  id="license_number"
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>

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
