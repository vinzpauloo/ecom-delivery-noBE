import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";

import styles from "./ProfileForm.module.scss";
import constants from "../../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  address: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(6, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(6, constants.form.error.lastNameMin).required(),
    address: yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().email(constants.form.error.email).required(),
    password: yup
      .string()
      .min(6, constants.form.error.passwordMin)
      .max(16, constants.form.error.passwordMax)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], constants.form.error.passwordConfirm)
      .required(),
  })
  .required();

interface ContainerProps {}

const ProfileForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log("onSubmit", data);

    /*
    try {
      // START: Access register API
      const url = process.env.REACT_APP_API_LOCAL + "/customer/register";
      const options = {
        headers: {
          Accept: process.env.REACT_APP_HEADER_ACCEPT_VND,
          "Content-Type": process.env.REACT_APP_HEADER_ACCEPT_VND,
        },
        withCredentials: true,
      };

      const response = await axios.post(url, data, options);
      // END: Access register API

      console.log("/customer/register", response);

      if (response.status === 201) {
        const { data } = response.data;

        console.log("Register success!", response);

        // navigate("/");
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        if (err.response && err.response.data.errors) {
          // Multiple errors from the backend
          let tempErrors: any[] = [];
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            tempErrors.push(value);
          }
          setMultipleErrors(tempErrors);
        } else {
          // Single error
          setError("*" + err.response?.data.message);
        }
      } else if (err && err instanceof Error) setError(err.message);

      console.log("Error", err);
    }
    */
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Basic details */}
        <div className={`mx-4 mx-md-5 mx-lg-0 ${styles.formInnerContainer}`}>
          <h3 className="text-center">Get started with FoodMonkey</h3>

          <Form.Group className="position-relative">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              onKeyUp={() => setError("")}
              required
              {...register("first_name")}
            />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              onKeyUp={() => setError("")}
              required
              {...register("last_name")}
            />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onKeyUp={() => setError("")}
              required
              {...register("email")}
            />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control
              type="text"
              onKeyUp={() => setError("")}
              required
              {...register("mobile")}
            />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onKeyUp={() => setError("")}
              required
              {...register("password")}
            />
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onKeyUp={() => setError("")}
              required
              {...register("password_confirmation")}
            />
          </Form.Group>

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            <p>{errors.address?.message}</p>
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.password_confirmation?.message}</p>

            {/* Errors from backend */}
            {multipleErrors.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>

        {/* Address details */}
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Enter Address</h3>

          <Form.Group className="position-relative">
            <Form.Label>Full Address</Form.Label>
            <Form.Control
              type="text"
              onKeyUp={() => setError("")}
              required
              {...register("address")}
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-center gap-5 mt-5">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/account/orders")}
          >
            Order
          </Button>

          <Button variant="primary" size="lg" type="submit">
            Save Info
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProfileForm;
