import React from "react";
import { Button, Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import styles from "./RegistrationForm.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";

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
                <Form.Control id="confirm_password" type="password" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact number</Form.Label>
                <Form.Control className="mb-0" id="contact" type="text" />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Restaurant Infromations</h3>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control id="restaurant_name" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Type of Cuisine</Form.Label>
                <Form.Control id="cuisine_type" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Mayor's Permit Number (Landline)</Form.Label>
                <Form.Control className="mb-0" id="permit_number" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Building Number or Stall Number</Form.Label>
                <Form.Control id="building_number" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Building Name, Street Name, Locality</Form.Label>
                <Form.Control id="address1" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Barangay, City or Town</Form.Label>
                <Form.Control className="mb-0" id="address2" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Telephone number</Form.Label>
                <Form.Control id="tel_number" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control id="mobile_number" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Social Media Account (Link)</Form.Label>
                <Form.Control id="soc_med_account" type="text" />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <Button variant="primary" size="lg" type="submit" className="mt-4">
          Create Account
        </Button>

        <div
          className={`position-relative d-flex align-items-center justify-content-center ${styles.checkbox}`}
        >
          <Form.Check
            type="checkbox"
            id="terms"
            label="By continuing, you indicate that you read and agreed to terms of use"
          />
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
