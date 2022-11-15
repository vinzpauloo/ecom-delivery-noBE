import React, { useState } from "react";
import { Table, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";

import styles from "./ProfileContent.module.scss";
import SearchIcon from "../../../assets/images/search.png";

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
    email: yup.string().required(),
    cellphone: yup.string().required(),
  })
  .required();

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const [profileModal, setProfileModal] = useState(false);
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
      owner_name: response.owner_name,
      restaurant_name: response.restaurant_name,
      restaurant_description: response.restaurant_description,
      address: response.address,
      email: response.email[0]?.address,
      cellphone: response.cellphone,
    };
    reset(defaultValues);
  };

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
                  placeholder="JohnDoe2022"
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
                  placeholder="Měiwèi de shíwù 美味的食物"
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
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
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
                  placeholder="Unit 123, GT Tower Intl., Ayala Avenue, Makati City"
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
                  placeholder="johndoe2022@gmail.com"
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
                  placeholder="(+63)917 456 7890"
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
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

function ProfileModal(props: any) {
  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  id="owner_name"
                  type="text"
                  placeholder="JohnDoe2022"
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
                  placeholder="Měiwèi de shíwù 美味的食物"
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
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
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
                  placeholder="Unit 123, GT Tower Intl., Ayala Avenue, Makati City"
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
                  placeholder="johndoe2022@gmail.com"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  id="contact_number"
                  type="text"
                  placeholder="(+63)917 456 7890"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className={styles.btnUpdate}>Update</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileContent;
