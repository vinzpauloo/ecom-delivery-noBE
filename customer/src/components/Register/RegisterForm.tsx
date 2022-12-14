import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";
import { useGoogleAPI } from "../../hooks/useGoogleAPI";
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
      .min(7, constants.form.error.passwordMin)
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

const Map = ({
  lat,
  lng,
  mapOnClick,
}: {
  lat: number;
  lng: number;
  mapOnClick: any;
}) => {
  const center = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  return (
    <GoogleMap
      zoom={18}
      center={center}
      mapContainerClassName={styles.map}
      onClick={(e) => mapOnClick(e)}
      options={{
        gestureHandling: "greedy",
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

const PlacesAutocomplete = ({
  address,
  setAddress,
  setLat,
  setLng,
}: {
  address: string;
  setAddress: any;
  setLat: any;
  setLng: any;
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
    console.log("handleSelect", address);

    // Address to Geocode conversion
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setLat(lat);
    setLng(lng);
  };

  useEffect(() => {
    setValue(address, false);
    clearSuggestions();
  }, [address]);

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
  const [isGranted, setIsGranted] = useState(false);
  // const [value, setValue] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { validateFields } = useValidate();
  const { reverseGeocode } = useGoogleAPI();

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
    const newFormData = {
      ...data,
      address: address,
      lat: lat.toString(),
      long: lng.toString(),
    };
    console.log("onsubmit", newFormData);

    if (!newFormData.address || !newFormData.lat || !newFormData.long) {
      setError("Please select address from autocomplete or pin your location.");
    } else {
      // Validate fields
      const response = await validateFields(newFormData);
      console.log("validateFields response", response);

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
    }
  };

  const handleReverseGeocode = async (lat: number, lng: number) => {
    console.log("handleReverseGeocode ...");

    const response = await reverseGeocode(lat, lng);
    console.log(response);

    setAddress(response);
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

          if (result.state === "prompt") {
            setModalShow(true);
          }

          if (result.state === "denied") {
            alert(
              "Location access is denied by your browser. Please grant location permission."
            );
          }

          if (result.state === "granted") setIsGranted(true);

          result.onchange = function () {
            console.log("Result changed!", result);

            if (result.state === "denied") {
              alert(
                "Location access is denied by your browser. Please grant location permission."
              );
            }

            if (result.state === "granted") setIsGranted(true);
          };
        });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Granted permission to get coordinates");
          console.log("Mapping ...");

          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setModalShow(true);

          // Reverse Geocode
          handleReverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const mapOnClick = async (e: any) => {
    console.log("mapOnClick clicked!");
    console.log(e);

    setLat(e.latLng.lat());
    setLng(e.latLng.lng());

    // Reverse Geocode
    handleReverseGeocode(e.latLng.lat(), e.latLng.lng());
  };

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
          {!isGranted ? (
            <div className="text-center py-5">
              <p>Waiting for location permission.</p>
              <div className="spinner-grow text-primary" role="status"></div>
            </div>
          ) : (
            <>
              <p
                className={`px-2 py-2 mb-0 text-center ${styles.modalAddress}`}
              >
                <strong>LOCATION:</strong> {address}
              </p>
              <Map lat={lat} lng={lng} mapOnClick={mapOnClick} />
            </>
          )}
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

            <p>{error}</p>
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

          <PlacesAutocomplete
            address={address}
            setAddress={setAddress}
            setLat={setLat}
            setLng={setLng}
          />
          <Button
            variant="primary"
            className={styles.pin}
            onClick={handlePinLocation}
          >
            Pin my location
          </Button>
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
          // disabled={!isValid || !isChecked || !address}
          disabled={!isChecked}
        >
          Create Account
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
