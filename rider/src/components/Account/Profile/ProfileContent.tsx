import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";

import styles from "./ProfileForm.module.scss";
import constants from "../../../utils/constants.json";

import "./ProfileContent.scss";

import bike1 from "../../../assets/images/bike1.png";
import bike2 from "../../../assets/images/bike2.png";
import bike3 from "../../../assets/images/bike3.png";
import bike4 from "../../../assets/images/bike4.png";
import bike5 from "../../../assets/images/bike5.png";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  full_name: string;
  mobile: string;
  email: string;
}

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(6, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(6, constants.form.error.lastNameMin).required(),
    mobile: yup.string().required(),
    email: yup.string().email(constants.form.error.email).required(),
  })
  .required();

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const navigate = useNavigate();

  const { getUser } = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log("onSubmit", data);
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
    };

    reset(defaultValues);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

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
                  onKeyUp={() => setError("")}
                  required
                  {...register("first_name")}
                  disabled
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
                <Form.Label>Driver's License Number</Form.Label>
                <Form.Control
                  id="landmark"
                  type="text"
                  placeholder="DLC - 12345"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("mobile")}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onKeyUp={() => setError("")}
                  required
                  {...register("email")}
                  disabled
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
            <Button id="editBtn">Edit</Button>
            <Button id="saveBtn">Save</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfileContent;
