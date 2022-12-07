import React, { useState, useEffect, useMemo } from "react";
import { Table, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";

import styles from "./ProfileContent.module.scss";
import constants from "../../../utils/constants.json";

import ImageUploading, { ImageListType } from "react-images-uploading";

import SearchIcon from "../../../assets/images/search.png";
import DefaultThumbnail from "../../../assets/images/default-thumbnail.jpg";
import { createRefresh } from "react-auth-kit";

import { useGoogleAPI } from "../../../hooks/useGoogleAPI";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";

import Lottie from "lottie-react";
import updateSuccess from "../../../assets/update-success.json";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  name: string;
  description: string;
  address: string;
  email: string;
  contact_number: string;
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
    first_name: yup.string().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    address: yup.string(),
    email: yup.string().email(constants.form.error.email).required(),
    contact_number: yup.string().required(),
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
      <Form.Label>Full Address</Form.Label>
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

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { reverseGeocode } = useGoogleAPI();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const maxNumber = 1;
  const [images, setImages] = React.useState<any>();
  const [defaultImg, setDefaultImg] = useState(true);

  const [updateModalShow, setUpdateModalShow] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
  };

  const handleClick = (onImageUpload: any) => {
    setDefaultImg((prev) => !prev);
    onImageUpload();
  };

  const handleRemove = (onImageRemove: any, index: any) => {
    onImageRemove(index);
    setDefaultImg((prev) => !prev);
  };

  const navigate = useNavigate();

  const { getUser, updateUser } = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const onSubmit = async (data: IFormInputs) => {
    console.log(data);
    console.log("Requesting updateUser ...");
    const updatedData = { ...data, address: address };

    const response = await updateUser(updatedData);
    console.log("updateUser response", response);

    if (!response.error) {
      setMessage(constants.form.success.updateProfile);
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
      email: response.email,
      first_name: response.first_name,
      last_name: response.last_name,
      mobile: response.mobile,
      address: response.restaurant[0]?.address,
      contact_number: response.restaurant[0]?.contact_number,
      description: response.restaurant[0]?.description,
      name: response.restaurant[0]?.name,
      photo: response.restaurant[0]?.photo || "https://placeholder.com/",
    };
    reset(defaultValues);
    setAddress(response.restaurant[0]?.address);
    setRestaurantId(response.restaurant[0].id);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

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

  const UpdateSuccessModal = (props: any) => {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center p-4`}>
            <Lottie animationData={updateSuccess} loop={true} />
            <p className="mt-4" style={{ fontWeight: "400" }}>
              Profile has been updated
            </p>

            <Link
              to="/account/for-delivery"
              className={`d-inline-block mt-2`}
              style={{
                background: "#e6b325",
                border: "none",
                borderRadius: "5px",
                color: "black",
                fontSize: "16px",
                fontWeight: "300",
                width: "180px",
                padding: "6px",
                textDecoration: "none",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Next
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className={styles.profileContentContainer}>
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
      <div className="">
        <h3>Restaurant Information</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  {...register("first_name")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  {...register("name")}
                  required
                />
              </Form.Group>
            </Col>
            {/* <Col>
              <Row>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="photo"
                  maxFileSize={1572864}
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
                    <div className="d-flex flex-direction-col justify-content-center align-items-center gap-2">
                      <Row>
                        {defaultImg ? (
                          <img
                            src={DefaultThumbnail}
                            className={styles.thumbNail}
                          />
                        ) : (
                          imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <img
                                src={image.photo}
                                className={styles.thumbNail}
                                alt="ad-img"
                              />
                              <Row  className={styles.btnUploadContent}>
                                <Form.Control
                                  value="Remove"
                                  type="button"
                                  className={styles.btnUpload}
                                  onClick={() =>
                                    handleRemove(onImageRemove, index)
                                  }
                                />
                              </Row>
                            </div>
                          ))
                        )}

                        <Form.Control
                          placeholder="Upload Logo"
                          className={styles.btnUpload}
                          onClick={() => handleClick(onImageUpload)}
                        />
                      </Row>
                      <Row>
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
                                Selected file size exceeded 1.5 MB.
                              </span>
                            )}
                            {errors.resolution && (
                              <span style={{ color: "red", fontWeight: "600" }}>
                                Selected file does not match the desired resolution
                              </span>
                            )}
                          </div>
                        )}
                      </Row>
                    </div>
                  )}
                </ImageUploading>
              </Row>
            </Col> */}
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Description</Form.Label>
                <Form.Control
                  as="textarea"
                  onKeyUp={() => resetMessages()}
                  {...register("description")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlacesAutocomplete
              address={address}
              setAddress={setAddress}
              setLat={setLat}
              setLng={setLng}
            />
            <Row className={styles.pinBtnContent}>
              <Button
                variant="primary"
                className={styles.pinBtn}
                onClick={handlePinLocation}
              >
                Pin my location
              </Button>
            </Row>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  {...register("email")}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  {...register("contact_number")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className={styles.buttonsContainer}>
            <Col className={styles.buttonLeftContainer}>
              <Button
                className={styles.btnUpdate}
                type="button"
                onClick={() => navigate(`/account/feedback/${restaurantId}`)}
              >
                My Ratings
              </Button>
            </Col>
            <Col className={styles.buttonRightContainer}>
              <Button
                className={styles.btnUpdate}
                type="submit"
                onClick={() => setUpdateModalShow(true)}
              >
                Update
              </Button>
              <UpdateSuccessModal
                show={updateModalShow}
                onHide={() => setUpdateModalShow(false)}
              />
              <Button
                className={styles.btnChangePass}
                onClick={() => navigate("/account/reset-password")}
              >
                Change Password
              </Button>
            </Col>
          </Row>
          {/* Success messages */}
          <div className={styles.success}>
            <p className="text-success">{message}</p>
          </div>
        </Form>
      </div>
    </div>
  );
};

// // Setup form schema & validation
// interface IFormInputs {
//   first_name: string;
//   name: string;
//   description: string;
//   address: string;
//   email: string;
//   mobile: string;
// }

// const schema = yup
//   .object({
//     first_name: yup.string().required(),
//     name: yup.string().required(),
//     description: yup.string().required(),
//     address: yup.string(),
//     email: yup.string().email(constants.form.error.email).required(),
//     mobile: yup.string().required(),
//   })
//   .required();

// function ProfileModal(props: any) {
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const { getUser, updateUser } = useUser();

//   const {
//     reset,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInputs>({
//     resolver: yupResolver(schema),
//   });

//   const resetMessages = () => {
//     setMessage("");
//     setError("");
//   };

//   const onSubmit = async (data: IFormInputs) => {
//     console.log(data);
//     console.log("Requesting updateUser ...");

//     const response = await updateUser(data);
//     console.log("updateUser response", response);

//     if (!response.error) {
//       setMessage(constants.form.success.updateProfile);
//     } else {
//       setError(response.error);
//     }
//   };

//   // Get user request
//   const handleGetUser = async () => {
//     console.log("Requesting getUser ...");

//     const response = await getUser();
//     console.log("handleGetUser response", response);
//     let defaultValues = {
//       email: response.email,
//       first_name: response.first_name,
//       last_name: response.last_name,
//       mobile: response.mobile,
//       address: response.restaurant[0]?.address,
//       contact_number: response.restaurant[0]?.contact_number,
//       description: response.restaurant[0]?.description,
//       name: response.restaurant[0]?.name,
//       photo: response.restaurant[0]?.photo || "https://placeholder.com/",
//     };
//     reset(defaultValues);
//   };

//   useEffect(() => {
//     handleGetUser();
//   }, []);

//   return (
//     <Modal {...props} size="lg">
//       <Modal.Header closeButton className={styles.modalHeader}>
//         {/* Success messages */}
//         <div className={styles.success}>
//           <p className="text-success">{message}</p>
//         </div>
//       </Modal.Header>
//       <Modal.Body className={styles.modalBody}>
//         <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//           <Row lg={2} xs={1}>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Owner Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("first_name")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row lg={2} xs={1}>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Restaurant Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("name")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Restaurant Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   onKeyUp={() => resetMessages()}
//                   {...register("description")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Resturant Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("address")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row lg={2} xs={1}>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("email")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Contact Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("mobile")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col></Col>
//           </Row>
//           <Row>
//             <Col>
//               <Button className={styles.btnUpdate} type="submit">
//                 Update
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

export default ProfileContent;
