import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";

import styles from "./ProfileContent.module.scss";
import constants from "../../../utils/constants.json";

import SearchIcon from "../../../assets/images/search.png";
import DefaultThumbnail from "../../../assets/images/default-thumbnail.jpg";



interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState([""]);
  const [profileModal, setProfileModal] = useState(false);
  const navigate = useNavigate();

  const { getUser, updateUser } = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // Get user request
  const handleGetUser = async () => {
    console.log("Requesting getUser ...");

    const response = await getUser();
    console.log("handleGetUser response", response);
    let defaultValues = {
      owner_name: response.owner_name,
      restaurant_name: response.restaurant_name,
      restaurant_description: response.restaurant_description,
      address: response.address,
      email: response.email[0]?.address,
      contact_number: response.contact_number,
    };
    reset(defaultValues);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div className={styles.profileContentContainer}>
      <div className="">
        <h3>Restaurant Information</h3>
        <Form>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  id="owner_name"
                  type="text"
                  onKeyUp={() => setError("")}
                  {...register("owner_name")}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  id="restaurant_name"
                  type="text"
                  onKeyUp={() => setError("")}
                  {...register("restaurant_name")}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Description</Form.Label>
                <Form.Control
                  id="restaurant_description"
                  as="textarea"
                  onKeyUp={() => setError("")}
                  {...register("restaurant_description")}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Resturant Address</Form.Label>
                <Form.Control
                  id="address"
                  type="text"
                  onKeyUp={() => setError("")}
                  {...register("address")}
                  disabled
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
                  onKeyUp={() => setError("")}
                  {...register("email")}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  id="contact_number"
                  type="text"
                  onKeyUp={() => setError("")}
                  {...register("cellphone")}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            
              <Button
                className={styles.btnEdit}
                onClick={() => setProfileModal(true)}
              >
                edit
              </Button>
              <ProfileModal
                show={profileModal}
                onHide={() => setProfileModal(false)}
              />
              <Button className={styles.btnChangePass} onClick={() => navigate("/account/reset-password")}>Change Password</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

// Setup form schema & validation
interface IFormInputs {
  owner_name: string;
  restaurant_name: string;
  restaurant_description: string;
  address: string;
  email: string;
  cellphone: string;
}

const schema = yup
  .object({
    owner_name: yup.string().required(),
    restaurant_name: yup.string().required(),
    restaurant_description: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email(constants.form.error.email).required(),
    contact_number: yup.string().required(),
  })
  .required();

function ProfileModal(props: any) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
      owner_name: response.owner_name,
      restaurant_name: response.restaurant_name,
      restaurant_description: response.restaurant_description,
      address: response.address,
      email: response.email[0]?.address,
      contact_number: response.contact_number,
    };
    reset(defaultValues);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control id="owner_name" type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control id="restaurant_name" type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Description</Form.Label>
                <Form.Control id="restaurant_description" as="textarea" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Resturant Address</Form.Label>
                <Form.Control id="address" type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control id="email" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control id="contact_number" type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className={styles.btnUpdate} type="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileContent;
