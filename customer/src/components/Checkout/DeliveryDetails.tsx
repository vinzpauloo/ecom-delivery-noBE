import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import { useOrders } from "../../hooks/useOrders";
import { useGoogleAPI } from "../../hooks/useGoogleAPI";
import { useIsAuthenticated } from "react-auth-kit";
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

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

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
  address?: string;
  mobile: string;
  email: string;
}

interface ContainerProps {
  cart?: TCart[];
  restaurantId?: number;
  note?: string;
  newAddress?: string;
  isNewAddress?: boolean;
  setIsNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
  lat: number;
  lng: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
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
    console.log(address);

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

const DeliveryDetails: React.FC<ContainerProps> = ({
  cart,
  restaurantId,
  note,
  newAddress,
  isNewAddress,
  setIsNewAddress,
  lat,
  lng,
  setLat,
  setLng,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalSuccessShow, setModalSuccessShow] = useState(false);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [modalError, setModalError] = useState("");
  const [orderId, setOrderId] = useState(0);
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { reverseGeocode } = useGoogleAPI();
  const { getUser } = useUser();
  const { createOrder } = useOrders();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const isAuthenticated = useIsAuthenticated();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const handleUseNewAddress = () => {
    setIsNewAddress(!isNewAddress);
  };

  const onSubmit = async (data: IFormInputs) => {
    // New address validation for logged in user
    if (isNewAddress && !newAddress) {
      alert("Please enter a new address!");
      return;
    }

    // Address validation for Guest
    if (!isAuthenticated() && !address) {
      alert("Please enter an address!");
      return;
    }

    // Cleanup cart object
    const newProducts = cart?.map((item, index) => {
      return { id: item.id, quantity: item.quantity };
    });

    let order = {
      products: newProducts,
      first_name: data.first_name,
      last_name: data.last_name,
      address: isNewAddress
        ? newAddress
        : isAuthenticated()
        ? data.address
        : address,
      email: data.email,
      mobile: data.mobile,
      restaurant_id: restaurantId,
      note: note,
      lat: lat.toString(),
      long: lng.toString(),
    };

    // Remove note key if empty/null
    if (!note || !note.replace(/ /g, "")) {
      delete order.note;
    }

    console.log("onsubmit", order);

    if (!isAuthenticated()) {
      // Guest checkout will go to OTP first

      // Set order data on local storage
      localStorage.setItem("order", JSON.stringify(order));

      // Navigate to OTP page
      navigate("/otp-order");
    } else {
      console.log("Checkout authenticated user ...");

      /* Create order as logged in user */
      const responseOrder = await createOrder(order);
      console.log("/api/orders", responseOrder);

      if (responseOrder.error) {
        setModalError(responseOrder.error);
        setModalErrorShow(true);
      } else {
        console.log("Create order success!", responseOrder);

        // Reset localStorage values
        localStorage.removeItem("checkout");
        localStorage.removeItem("order");

        // Set new order id
        setOrderId(responseOrder.id);

        // Show modal after create order
        setModalSuccessShow(true);
      }
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
      address: response.address[0]?.address,
    };

    reset(defaultValues);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      handleGetUser();
    }
  }, []);

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

      <Modal
        show={modalSuccessShow}
        onHide={() => setModalSuccessShow(false)}
        onExiting={() => navigate(`/order/${orderId}`)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center p-4 ${styles.lottie}`}>
            <Lottie animationData={otpSuccess} loop={true} />
            <p className="mt-4">Order Created Successfully</p>

            <Link
              to={`/order/${orderId}`}
              className={`d-inline-block mt-2 ${styles.button}`}
            >
              Go to Delivery Status
            </Link>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={modalErrorShow}
        onHide={() => setModalErrorShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center p-4 ${styles.lottie}`}>
            {/* <Lottie animationData={otpSuccess} loop={true} /> */}
            <h4 className="mt-4 text-danger">Oops!</h4>
            <p className="mt-4">{modalError}</p>

            <Link
              to="#"
              className={`d-inline-block mt-2 ${styles.button}`}
              onClick={() => setModalErrorShow(false)}
            >
              Close
            </Link>
          </div>
        </Modal.Body>
      </Modal>

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

                {isAuthenticated() ? (
                  <Form.Control
                    type="text"
                    required
                    {...register("address")}
                    disabled={isAuthenticated()}
                  />
                ) : (
                  <PlacesAutocomplete
                    address={address}
                    setAddress={setAddress}
                    setLat={setLat}
                    setLng={setLng}
                  />
                )}
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
                <>
                  <Button
                    variant="primary"
                    className={styles.pin}
                    onClick={handlePinLocation}
                  >
                    Pin my location
                  </Button>
                </>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Error messages */}
              <div className={styles.errors}>
                <p>{errors.first_name?.message}</p>
                <p>{errors.last_name?.message}</p>
                <p>{errors.mobile?.message}</p>
                <p>{errors.email?.message}</p>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default DeliveryDetails;
