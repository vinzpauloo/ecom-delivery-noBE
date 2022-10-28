import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RegisterForm.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";

interface ContainerProps {}

const RegisterForm: React.FC<ContainerProps> = ({}) => {
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
          <h3 className="text-center">Get started with FoodMonkey</h3>

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
                <Form.Label>User ID</Form.Label>
                <Form.Control id="user_id" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
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
                <Form.Control id="confirm_password" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact number</Form.Label>
                <Form.Control id="contact" type="text" />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Enter Address</h3>

          <Row>
            <Col lg={{ span: 8, offset: 2 }} xs={12}>
              <Form.Group className="position-relative">
                <Form.Label>
                  Number of Home or Flat, Subdivision and Street
                </Form.Label>
                <Form.Control id="address_street" type="text" />
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label>Barangay</Form.Label>
                <Form.Control id="address_barangay" type="text" />
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label>City or Town</Form.Label>
                <Form.Control id="address_city" type="text" />
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
          />
        </div>

        <Button variant="primary" size="lg" type="submit" className="mt-4">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
