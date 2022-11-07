import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RegistrationForm.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import RiderProfile from "../../assets/images/riderprofile.png";

interface ContainerProps {}

const RegistrationForm: React.FC<ContainerProps> = ({}) => {
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
          <h3 className="text-center">Personal Information</h3>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>First name</Form.Label>
                <Form.Control id="first_name" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Last name</Form.Label>
                <Form.Control id="last_name" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control id="user_id" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control id="email" type="email" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control id="password" type="password" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control id="confirm_password" type="password" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Driver's License Number</Form.Label>
                <Form.Control id="contact" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Driver's License Expiration Date</Form.Label>
                <Form.Control className="mb-0" id="contact" type="text" />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <hr className="d-none d-lg-block" />

        <div className="rider-2">
          {/* <h3 className="text-center">Vehicle Informations</h3>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Model</Form.Label>
                <Form.Control id="model" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Make</Form.Label>
                <Form.Control id="make" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>year</Form.Label>
                <Form.Control className="mb-0" id="year" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>OR/CR number</Form.Label>
                <Form.Control id="orcr_number" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Plate number</Form.Label>
                <Form.Control id="plate_number" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>License number</Form.Label>
                <Form.Control
                  className="mb-0"
                  id="license_number"
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row> */}

          <Row>
            <Col></Col>
          </Row>

          <Row>
            <Col className="position-relative"></Col>
          </Row>
        </div>

        {/* <div
          className={`position-relative d-flex align-items-center justify-content-center ${styles.checkbox}`}
        >
          <Form.Check
            type="checkbox"
            id="terms"
            label="By continuing, you indicate that you read and agreed to terms of use"
          />
        </div> */}
      </Form>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <img src={RiderProfile} className="w-25 img-fluid mb-3" />
        <div className="position-relative">
          <input
            placeholder="Profile Picture (PDF*JPG*PNG)"
            className={`bg-white ${styles.test}`}
          />
          <a className={`position-absolute ${styles.test2}`}>Browse File</a>
        </div>
        <div className="position-relative">
          <input
            placeholder="Driver’s License Image (PDF*JPG*PNG)"
            className={`bg-white ${styles.test}`}
          />
          <a className={`position-absolute ${styles.test2}`}>Browse File</a>
        </div>
        <div className="nextBtn">
          <Button
            variant="warning"
            size="lg"
            type="submit"
            className="mt-4"
            id="nextBtn-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
