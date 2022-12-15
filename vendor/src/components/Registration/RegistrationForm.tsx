import React, { useState, useEffect, useMemo } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";

import ImageUploading, { ImageListType } from "react-images-uploading";

import styles from "./RegistrationForm.module.scss";
import constants from "../../utils/constants.json";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import DefaultThumbnail from "../../assets/images/default-thumbnail.jpg";

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
import { Modal } from "react-bootstrap";

// Setup form schema & validation
interface IFormInputs {
  mobile: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  contact_number: string;
  restaurant_email: string;
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
    mobile: yup
      .string()
      .matches(/^(09|\+639)\d{9}$/, constants.form.error.mobile)
      .required(),
    password: yup
      .string()
      .min(7, constants.form.error.passwordMin)
      .max(16, constants.form.error.passwordMax)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], constants.form.error.passwordConfirm)
      .required(),
    first_name: yup
      .string()
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    email: yup.string().email(constants.form.error.email).required(),
    name: yup.string().min(2, constants.form.error.nameMin).required(),
    contact_number: yup
      .string()
      .matches(/^(09|\+639)\d{9}$/, constants.form.error.mobile)
      .required(),
    restaurant_email: yup.string().email(constants.form.error.email).required(),
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
      {/* <Form.Label>Full Address</Form.Label> */}
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // disabled={!ready}
          placeholder="Address"
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

const RegistrationForm: React.FC<ContainerProps> = ({}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [images, setImages] = React.useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultImg, setDefaultImg] = useState(true);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [address, setAddress] = useState("");
  const maxNumber = 1;
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
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
    setDefaultImg((prev) => !prev);
  };

  const handleClick = (onImageUpload: any) => {
    // setDefaultImg((prev) => !prev);
    onImageUpload();
  };

  const handleRemove = (onImageRemove: any, index: any) => {
    onImageRemove(index);
    // setDefaultImg((prev) => !prev);
  };

  const onSubmit = async (data: IFormInputs) => {
    const message = document.getElementById("imageError") as HTMLInputElement;

    try {
      console.log(address);
      const data1 = {
        ...data,
        address: address,
        lat: lat.toString(),
        long: lng.toString(),
      };
      // Validate fields
      const data2 = {
        ...data,
        photo: images[0].photo,
        address: address,
        lat: lat.toString(),
        long: lng.toString(),
      };
      const response = await validateFields(data1);
      console.log(data2);

      if (response.errors) {
        // Prepare errors
        let arrErrors: string[] = [];
        for (let value of Object.values(response.errors)) {
          arrErrors.push("*" + value);
        }
        setApiErrors(arrErrors);
      } else {
        // Set Register data on local storage
        localStorage.setItem("registerUser", JSON.stringify(data2));

        // Navigate to OTP page
        navigate("/otp");
      }
    } catch (error) {
      console.log(error);
      // setErrorImage(e);
      message.innerHTML =
        "A restaurant profile photo is required. Please make sure the image is less than 15MB.";
    }
  };

  const handleReverseGeocode = async (lat: number, lng: number) => {
    const response = await reverseGeocode(lat, lng);

    setAddress(response);
  };

  const handlePinLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");

      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then(function (result) {
          if (result.state === "denied") {
            alert(
              "Location access is denied by your browser. Please grant location permission."
            );
          }

          // if (result.state === "granted") setModalShow(true);

          result.onchange = function () {
            if (result.state === "denied") {
              alert(
                "Location access is denied by your browser. Please grant location permission."
              );
            }
          };
        });

      navigator.geolocation.getCurrentPosition(
        (position) => {
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
    setLat(e.latLng.lat());
    setLng(e.latLng.lng());

    // Reverse Geocode
    handleReverseGeocode(e.latLng.lat(), e.latLng.lng());
  };

  return (
    <div>
      <Modal
        size="xl"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-0">
          <p className={`px-2 py-2 mb-0 text-center ${styles.modalAddress}`}>
            <strong>LOCATION:</strong> {address}
          </p>

          <Map lat={lat} lng={lng} mapOnClick={mapOnClick} />
        </Modal.Body>
      </Modal>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Owner Info</h3>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  required
                  {...register("first_name")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  required
                  {...register("last_name")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Contact Number (+639xxxxxxxxx)"
                  required
                  {...register("mobile")}
                  defaultValue="+63"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  {...register("email")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  {...register("password")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  {...register("password_confirmation")}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Restaurant Info</h3>

          <Row className={styles.restaurantContent}>
            <Col className="col-md-9">
              <Row>
                <Col className="col-lg-9 col-md-8 pe-1">
                  <Form.Group className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Restaurant Name"
                      required
                      {...register("name")}
                    />
                  </Form.Group>
                </Col>
                <Col className="col-lg-3 col-md-4 ps-1">
                  <Button
                    variant="primary"
                    className={styles.pin}
                    onClick={handlePinLocation}
                  >
                    Pin my location
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <PlacesAutocomplete
                    address={address}
                    setAddress={setAddress}
                    setLat={setLat}
                    setLng={setLng}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Contact Number (+639xxxxxxxxx)"
                      required
                      {...register("contact_number")}
                      defaultValue="+63"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Email Address"
                      required
                      {...register("restaurant_email")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col className="col-md-3">
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="photo"
                maxFileSize={150000}
                acceptType={["jpg", "png"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                  errors,
                }) => (
                  <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    {defaultImg ? (
                      <img
                        src={DefaultThumbnail}
                        className={styles.thumbNail}
                        alt=""
                      />
                    ) : (
                      imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img
                            src={image.photo}
                            className={styles.thumbNail2}
                            alt=""
                          />
                          <div
                            className={`${styles.btnUpload} mt-2`}
                            onClick={() => handleRemove(onImageRemove, index)}
                          >
                            Remove
                          </div>
                        </div>
                      ))
                    )}
                    <Row className="">
                      <Col>
                        <Form.Control
                          placeholder="Upload Logo"
                          className={styles.btnUpload}
                          onClick={() => handleClick(onImageUpload)}
                        />
                      </Col>
                    </Row>
                    <div className={styles.errors}>
                      <p id="imageError"></p>
                    </div>
                    {errors && (
                      <div>
                        {errors.maxNumber && (
                          <span style={{ color: "red", fontWeight: "600" }}>
                            Number of selected images exceed.
                          </span>
                        )}
                        {errors.acceptType && (
                          <span style={{ color: "red", fontWeight: "600" }}>
                            Your selected file type is not allowed.
                          </span>
                        )}
                        {errors.maxFileSize && (
                          <span style={{ color: "red", fontWeight: "600" }}>
                            Selected file size exceeded 150 KB.
                          </span>
                        )}
                        {errors.resolution && (
                          <span style={{ color: "red", fontWeight: "600" }}>
                            Selected file does not match the desired resolution
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </ImageUploading>
            </Col>
          </Row>

          {/* Error messages */}
          <div className={styles.errors}>
            {apiErrors.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}

            <p>{errors.first_name?.message}</p>
            <p>{errors.last_name?.message}</p>
            <p>{errors.mobile?.message}</p>
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
            <p>{errors.password_confirmation?.message}</p>
            <p>{errors.name?.message}</p>
            <p>{errors.contact_number?.message}</p>
            <p>{errors.restaurant_email?.message}</p>
          </div>
        </div>

        <div
          className={`position-relative d-flex align-items-center justify-content-center ${styles.checkbox}`}
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
          className={`mt-4 ${styles.createBtn}`}
          disabled={!isDirty || !isChecked}
        >
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
