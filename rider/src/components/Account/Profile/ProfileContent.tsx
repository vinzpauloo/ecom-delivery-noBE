import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "./ProfileContent.scss";

import bike1 from "../../../assets/images/bike1.png";
import bike2 from "../../../assets/images/bike2.png";
import bike3 from "../../../assets/images/bike3.png";
import bike4 from "../../../assets/images/bike4.png";
import bike5 from "../../../assets/images/bike5.png";

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="profile-content-container">
      <div className="right">
        <h3>My Account</h3>
        <Form>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  id="full_name"
                  type="text"
                  placeholder="Alexan Louis Torio"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Motor Vehicle</Form.Label>
                <Form.Control
                  id="motor_vehicle"
                  type="text"
                  placeholder="Yamaha T-MAX 2022"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Building number and Name</Form.Label>
                <Form.Control
                  id="building_details"
                  type="text"
                  placeholder="Unit 123, GT Tower Intl. "
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Street Name and Barangay</Form.Label>
                <Form.Control
                  id="street_details"
                  type="text"
                  placeholder="Ayala Avenue, Brgy Poblacion"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>City or Town, Pincode</Form.Label>
                <Form.Control
                  id="city_details"
                  type="text"
                  placeholder="Makati City 4114"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Landmark</Form.Label>
                <Form.Control
                  id="landmark"
                  type="text"
                  placeholder="In front of RCBC tower "
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="email"
                  type="text"
                  placeholder="JohnDoe2022@gmail.com"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  id="contact_number"
                  type="text"
                  placeholder="(+63) 917 456 7890"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="bike-images">
            <img src={bike1} alt="" />
            <img src={bike2} alt="" />
            <img src={bike3} alt="" />
            <img src={bike4} alt="" />
            <img src={bike5} alt="" className="d-none d-md-block" />
          </div>

          <div className="buttons">
            <a id="saveBtn" href="#">
              Edit
            </a>
            <a id="editBtn" href="#">
              Save
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfileContent;
