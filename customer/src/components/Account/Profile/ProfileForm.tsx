import React, { useState, useEffect, useMemo } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { useGoogleAPI } from "../../../hooks/useGoogleAPI";
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
const DEFAULT_COORDINATES = {
  lat: 9.568885793195934,
  lng: 123.77310991287231,
};

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
      zoom={16}
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
  const [modalShow, setModalShow] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [lat, setLat] = useState(DEFAULT_COORDINATES.lat);
  const [lng, setLng] = useState(DEFAULT_COORDINATES.lng);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { getUser, updateUser } = useUser();
  const signIn = useSignIn();
  const { reverseGeocode } = useGoogleAPI();
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
    const newFormData = {
      ...data,
      address: address,
      lat: lat.toString(),
      long: lng.toString(),
    };
    console.log("onsubmit", newFormData);

    const response = await updateUser(newFormData);
    console.log("updateUser response", response);

    if (!response.error) {
      setMessage(constants.form.success.updateProfile);

      // Re-login with new user state
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

  const handleReverseGeocode = async (lat: number, lng: number) => {
    console.log("handleReverseGeocode ...");

    const response = await reverseGeocode(lat, lng);
    console.log(response);

    setAddress(response);
  };

  const mapErrorAlert = () => {
    setTimeout(
      () =>
        alert("Location permission is not granted by your browser or device."),
      500
    );
  };

  const handlePinLocation = () => {
    console.log("handlePinLocation ...");

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      alert("Geolocation is not supported by your browser or device.");
    } else {
      setStatus("Requesting location access ...");
      setModalShow(true);

      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then(function (result) {
          // console.log(result.state);

          if (result.state === "denied") {
            mapErrorAlert();
          }

          if (result.state === "granted") setIsGranted(true);

          result.onchange = function () {
            // console.log("Result changed!", result);

            if (result.state === "denied") {
              mapErrorAlert();
            }

            if (result.state === "granted") setIsGranted(true);
          };
        });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log("Granted permission to get coordinates");
          // console.log("Mapping ...");

          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);

          // Reverse Geocode
          handleReverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          setStatus("Unable to retrieve your location.");
        }
      );
    }
  };

  const mapOnClick = async (e: any) => {
    // console.log("mapOnClick clicked!");
    // console.log(e);

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
          {/* Old flow, need */}
          {/* {!isGranted ? (
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
          )} */}

          {/* Revised flow, show default Google Map coordinates */}
          <>
            <p className={`px-2 py-2 mb-0 text-left ${styles.modalAddress}`}>
              {isGranted ? (
                <>
                  <strong>LOCATION:</strong> {address}
                </>
              ) : (
                <>
                  <strong>WARNING:</strong> {status}
                </>
              )}
            </p>
            <Map lat={lat} lng={lng} mapOnClick={mapOnClick} />
          </>
        </Modal.Body>
      </Modal>

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

          <Button
            variant="primary"
            className={styles.btnChangePass}
            onClick={() => navigate("change-password")}
          >
            Change Password
          </Button>

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

          <Button
            variant="primary"
            className={styles.pin}
            onClick={handlePinLocation}
          >
            Pin my location
          </Button>
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
