import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";
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

import styles from "./RegisterForm.module.scss";
import constants from "../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  // address: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
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

const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";

const Map = ({ lat, lng }: { lat: number; lng: number }) => {
  const center = useMemo(() => ({ lat: lat, lng: lng }), []);

  return (
    <GoogleMap zoom={18} center={center} mapContainerClassName={styles.map}>
      <Marker position={center} />
    </GoogleMap>
  );
};

const PlacesAutocomplete = ({ setAddress }: { setAddress: any }) => {
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

const RegisterForm: React.FC<ContainerProps> = ({}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [modalShow, setModalShow] = useState(false);
  // const [value, setValue] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  // const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const { validateFields } = useValidate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    // Add address to form data
    const newFormData = { ...data, address: address };
    console.log("onsubmit", newFormData);

    // Validate fields
    const response = await validateFields(newFormData);
    console.log(response);

    if (response.errors) {
      // Prepare errors
      let arrErrors: string[] = [];
      for (let value of Object.values(response.errors)) {
        arrErrors.push("*" + value);
      }
      setApiErrors(arrErrors);
    } else {
      // Set register data on local storage
      localStorage.setItem("registerUser", JSON.stringify(newFormData));

      // Navigate to OTP page
      navigate("/otp");
    }
  };

  // const handlePinLocation = () => {
  //   console.log("handlePinLocation ...");

  //   if (!navigator.geolocation) {
  //     setStatus("Geolocation is not supported by your browser");
  //   } else {
  //     setStatus("Locating...");

  //     navigator.permissions
  //       .query({
  //         name: "geolocation",
  //       })
  //       .then(function (result) {
  //         console.log(result.state);

  //         if (result.state === "denied") {
  //           alert(
  //             "Location access is denied by your browser. Please grant location permission."
  //           );
  //         }

  //         if (result.state === "granted") setModalShow(true);

  //         result.onchange = function () {
  //           console.log("Result changed!", result);

  //           if (result.state === "denied") {
  //             alert(
  //               "Location access is denied by your browser. Please grant location permission."
  //             );
  //           }

  //           if (result.state === "granted") setModalShow(true);
  //         };
  //       });

  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("Granted permission to get coordinates");
  //         console.log("Mapping ...");

  //         setStatus("");
  //         setLat(position.coords.latitude);
  //         setLng(position.coords.longitude);

  //         // Reverse Geocode
  //       },
  //       () => {
  //         setStatus("Unable to retrieve your location");
  //       }
  //     );
  //   }
  // };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Modal
        size="xl"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-0">
          <p className="mb-0">Latitude: {lat}</p>
          <p className="mb-0">Longitude: {lng}</p>

          <Map lat={lat} lng={lng} />
        </Modal.Body>
      </Modal>

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
          {/* <p className="mb-0">{status}</p> */}
          <div className={styles.errors}>
            {apiErrors.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}

            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            {/* <p>{errors.address?.message}</p> */}
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.password_confirmation?.message}</p>
          </div>
        </div>

        {/* Address details */}
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Enter Address</h3>

          {/* <Form.Group className="position-relative">
            <Form.Label>Full Address</Form.Label>
            <Form.Control type="text" required {...register("address")} />
          </Form.Group> */}

          <PlacesAutocomplete setAddress={setAddress} />
          {/* <Button
            variant="primary"
            className={styles.pin}
            onClick={handlePinLocation}
          >
            Pin my location
          </Button> */}
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
          disabled={!isValid || !isChecked || !address}
        >
          Create Account
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
