import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import { useIsAuthenticated } from "react-auth-kit";

import styles from "./DeliveryDetails.module.scss";
import constants from "../../utils/constants.json";

type TCart = {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
};

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  address: string;
  mobile: string;
  email: string;
}

interface ContainerProps {
  cart?: TCart[];
  restaurantId?: number;
  note?: string;
  isNewAddress?: boolean;
  setIsNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    address: yup.string().required(),
    mobile: yup
      .string()
      .matches(/^\+(?:[0-9] ?){11,12}[0-9]$/, constants.form.error.mobile)
      .required(),
    email: yup.string().email(constants.form.error.email).required(),
  })
  .required();

const DeliveryDetails: React.FC<ContainerProps> = ({
  cart,
  restaurantId,
  note,
  isNewAddress,
  setIsNewAddress,
}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
  const isAuthenticated = useIsAuthenticated();

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const handleUseNewAddress = () => {
    setIsNewAddress(!isNewAddress);
  };

  const onSubmit = async (data: IFormInputs) => {
    const order = {
      products: cart,
      first_name: data.first_name,
      last_name: data.last_name,
      address: data.address,
      email: data.email,
      mobile: data.mobile,
      restaurant_id: restaurantId,
      note: note,
    };

    console.log("onSubmit", order);

    // Set order data on local storage
    localStorage.setItem("order", JSON.stringify(order));

    // Navigate to OTP page
    navigate("/otp-order");
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
      address: response.address[0]?.address,
    };

    reset(defaultValues);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      handleGetUser();
    }
  }, []);

  return (
    <div className={styles.container}>
      <h4>Delivery Details</h4>

      <Form
        className={styles.form}
        id="delivery-details"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row lg={2} xs={1}>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                onKeyUp={() => resetMessages()}
                required
                {...register("first_name")}
                disabled={isAuthenticated()}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                onKeyUp={() => resetMessages()}
                required
                {...register("last_name")}
                disabled={isAuthenticated()}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row lg={2} xs={1}>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Mobile number</Form.Label>
              <Form.Control
                type="text"
                required
                {...register("mobile")}
                disabled={isAuthenticated()}
                defaultValue="+63"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                {...register("email")}
                disabled={isAuthenticated()}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row lg={2} xs={1}>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Enter Address</Form.Label>
              <Form.Control
                type="text"
                onKeyUp={() => resetMessages()}
                required
                {...register("address")}
                disabled={isAuthenticated()}
              />
            </Form.Group>
          </Col>
          <Col>
            {isAuthenticated() ? (
              <div
                className={`d-flex justify-content-center gap-4 ${styles.checkbox}`}
              >
                <Form.Check
                  type="checkbox"
                  id="address_new"
                  label="Use Different Address"
                  checked={isNewAddress}
                  onChange={handleUseNewAddress}
                />
              </div>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            {/* Error messages */}
            <div className={styles.errors}>
              <p>{errors.first_name?.message}</p>
              <p>{errors.last_name?.message}</p>
              <p>{errors.address?.message}</p>
              <p>{errors.mobile?.message}</p>
              <p>{errors.email?.message}</p>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeliveryDetails;
