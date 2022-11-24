import React, { useState, useEffect, useRef } from "react";
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
import { string } from "yup/lib/locale";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  full_name: string;
  mobile: string;
  email: string;
  address: string;
  brand: string;
  model: string;
  or_number: string;
  plate_number: string;
  license_expiration: string;
  license_number: string;
  // license_type: string;
  // year: string;
}

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(6, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    address: yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().email(constants.form.error.email).required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    or_number: yup.string().required(),
    plate_number: yup.string().required(),
    license_expiration: yup.string().required(),
    license_number: yup.string().required(),
    // license_type: yup.string().required(),
    // year: yup.string().required(),
  })
  .required();

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const handleInput = () => {
    setDisabled(!disabled);
  };

  const saveAlert = () => {
    alert("Profile has been updated.");
  };

  const { getUser, updateUser } = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log("Requesting updateUser ...");

    const response = await updateUser(data);
    console.log("updateUser response", response);

    if (!response.error) {
      setMessage(constants.form.success.updateProfile);
    } else {
      setError(response.error);
    }
  };

  // Get user request
  const handleGetUser = async () => {
    console.log("Requesting getUser ...");

    const response = await getUser();
    console.log("handleGetUser response", response);
    let defaultValues = {
      first_name: response.first_name,
      last_name: response.last_name,
      address: response.rider.address,
      email: response.email,
      mobile: response.mobile,
      brand: response.rider.brand,
      model: response.rider.model,
      or_number: response.rider.or_number,
      plate_number: response.rider.plate_number,
      license_expiration: response.rider.license_expiration,
      license_number: response.rider.license_number,
      // license_type: response.rider.license_type,
      // year: response.rider.year,
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  id="first_name"
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("first_name")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  id="last_name"
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("last_name")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  id="address"
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("address")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="mobile"
                  onKeyUp={() => setError("")}
                  required
                  {...register("mobile")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onKeyUp={() => setError("")}
                  required
                  {...register("email")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative d-none d-md-block">
                <Form.Label>Driver's License Expiration Date</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("license_expiration")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  id="year"
                  type="text"
                  {...register("brand")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative d-none d-md-block">
                <Form.Label>Driver's License Number</Form.Label>
                <Form.Control
                  type="text"
                  {...register("license_number")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  id="model"
                  type="text"
                  {...register("model")}
                  // disabled={disabled}
                />
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label>OR Number</Form.Label>
                <Form.Control
                  id="or_number"
                  type="text"
                  {...register("or_number")}
                  // disabled={disabled}
                />
              </Form.Group>
              <Form.Group className="position-relative">
                <Form.Label>Plate Number</Form.Label>
                <Form.Control
                  id="plate_number"
                  type="text"
                  {...register("plate_number")}
                  // disabled={disabled}
                />
              </Form.Group>
            </Col>

            {/* <Col className="bike-images">
              <img src={bike1} alt="" />
              <img src={bike2} alt="" />
              <img src={bike3} alt="" />
              <img src={bike4} alt="" />

              <div className="px-4 d-none d-lg-block">
                <Button>Upload</Button>
              </div>
            </Col> */}
          </Row>
          <div className="buttons">
            {/* <Button id="editBtn" onClick={handleInput} className="d-lg-none">
              Upload
            </Button> */}
            <Button
              id="saveBtn"
              type="submit"
              onClick={saveAlert}
              className="mt-5"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfileContent;
