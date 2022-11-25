import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { useSignIn } from "react-auth-kit";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import styles from "./ProfileForm.module.scss";
import constants from "../../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  // address: string;
  mobile: string;
  email: string;
}

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    // address: yup.string().required(),
    mobile: yup
      .string()
      .matches(/^(09|\+639)\d{9}$/, constants.form.error.mobile)
      .required(),
    email: yup.string().email(constants.form.error.email).required(),
  })
  .required();

interface ContainerProps {}

const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";

const PlacesAutocomplete = ({
  address,
  setAddress,
}: {
  address: string;
  setAddress: any;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    setAddress(address);
    clearSuggestions();
    console.log(address);
  };

  return (
    <Form.Group className="position-relative">
      <Form.Label>Full Address</Form.Label>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={address}
          onChange={(e) => {
            setValue(e.target.value);
            setAddress(e.target.value);
          }}
          disabled={!ready}
          className={styles.addressInput}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Form.Group>
  );
};

const ProfileForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { getUser, updateUser } = useUser();
  const signIn = useSignIn();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const onSubmit = async (data: IFormInputs) => {
    // Add address to form data
    const newFormData = { ...data, address: address };
    console.log("onsubmit", newFormData);

    const response = await updateUser(newFormData);
    console.log("updateUser response", response);

    if (!response.error) {
      setMessage(constants.form.success.updateProfile);

      signIn({
        token: localStorage.getItem("_auth") || "",
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: response,
      });
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
      email: response.email,
      mobile: response.mobile,
      // address: response.address[0]?.address,
    };

    reset(defaultValues);
    setAddress(response.address[0]?.address);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Basic details */}
        <div className={`mx-4 mx-md-5 mx-lg-0 ${styles.formInnerContainer}`}>
          <h3 className="text-center">My Account</h3>

          <Row md={2} xs={1} className="mb-lg-3 mb-md-2">
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  required
                  {...register("first_name")}
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
                />
              </Form.Group>
            </Col>
          </Row>

          <Row md={2} xs={1} className="mb-lg-3 mb-md-2">
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  {...register("email")}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  type="text"
                  required
                  {...register("mobile")}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <Button
            variant="primary"
            type="submit"
            className={styles.btnChangePass}
            onClick={() => navigate("change-password")}
          >
            Change Password
          </Button> */}

          {/* Error messages */}
          <div className={styles.errors}>
            <p>{error}</p>
            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            {/* <p>{errors.address?.message}</p> */}
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
          </div>
        </div>

        {/* Address details */}
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Enter Address</h3>

          <PlacesAutocomplete address={address} setAddress={setAddress} />

          {/* <Form.Group className="position-relative">
            <Form.Label>Full Address</Form.Label>
            <Form.Control
              type="text"
              onKeyUp={() => resetMessages()}
              required
              {...register("address")}
            />
          </Form.Group> */}
        </div>

        {/* Success messages */}
        <p className="text-success">{message}</p>

        <div className="d-flex justify-content-center gap-5 mt-sm-5 mt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/account/orders")}
          >
            Orders
          </Button>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={!isValid || !address}
          >
            Save Info
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProfileForm;
