import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import styles from "./RegisterForm.module.scss";
import constants from "../../utils/constants.json";

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
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    address: yup.string().required(),
    mobile: yup
      .string()
      .matches(/^\+(?:[0-9] ?){11,12}[0-9]$/, constants.form.error.mobile)
      .required(),
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

const RegisterForm: React.FC<ContainerProps> = ({}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [value, setValue] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const { validateFields } = useValidate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    // Validate fields
    const response = await validateFields(data);

    if (response.errors) {
      // Prepare errors
      let arrErrors: string[] = [];
      for (let value of Object.values(response.errors)) {
        arrErrors.push("*" + value);
      }
      setApiErrors(arrErrors);
    } else {
      // Set register data on local storage
      localStorage.setItem("registerUser", JSON.stringify(data));

      // Navigate to OTP page
      navigate("/otp");
    }
  };

  const handlePinLocation = () => {
    console.log("handlePinLocation ...");

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");

      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then(function (result) {
          console.log(result.state);
          result.onchange = function () {
            console.log("Rresult changed!", result);
          };
        });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Basic details */}
        <div className={`mx-4 mx-md-5 mx-lg-0 ${styles.formInnerContainer}`}>
          <h3 className="text-center">Get started with FoodMonkey</h3>

          <Row md={2} xs={1} className="mb-lg-3 mb-md-2">
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  {...register("first_name")}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" required {...register("last_name")} />
              </Form.Group>
            </Col>
          </Row>

          <Row md={2} xs={1} className="mb-lg-3 mb-md-2">
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+639xxxxxxxxx"
                  required
                  {...register("mobile")}
                  defaultValue="+63"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required {...register("email")} />
              </Form.Group>
            </Col>
          </Row>

          <Row md={2} xs={1} className="mb-lg-3 mb-md-2">
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  {...register("password")}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  {...register("password_confirmation")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Error messages */}
          <div className={styles.errors}>
            {apiErrors.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}

            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            <p>{errors.address?.message}</p>
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.password_confirmation?.message}</p>
          </div>
        </div>

        {/* Address details */}
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Enter Address</h3>

          <Form.Group className="position-relative">
            <Form.Label>Full Address</Form.Label>
            <Form.Control type="text" required {...register("address")} />
          </Form.Group>

          <Button
            variant="primary"
            className={styles.pin}
            onClick={handlePinLocation}
          >
            Pin my location
          </Button>
          <p className="mb-0">{status}</p>
          <p className="mb-0">Latitude: {lat}</p>
          <p className="mb-0">Longitude: {lng}</p>

          {/* <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
            selectProps={{
              value,
              onChange: setValue,
            }}
          /> */}
        </div>

        <div
          className={`d-flex align-items-center justify-content-center ${styles.checkbox}`}
        >
          <Form.Check
            type="checkbox"
            id="terms"
            label="By continuing, you indicate that you read and agreed to terms of use"
            required
            onChange={() => setIsChecked(!isChecked)}
            checked={isChecked}
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="mt-4"
          disabled={!isValid || !isChecked}
        >
          Create Account
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
