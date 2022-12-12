import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import useHistory from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useValidate } from "../../hooks/useValidate";

import ImageUploading, { ImageListType } from "react-images-uploading";

import styles from "./RegistrationForm.module.scss";
import constants from "../../utils/constants.json";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import RiderProfile from "../../assets/images/riderprofile.png";
import "bootstrap/dist/css/bootstrap.min.css";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  last_name: string;
  // full_name: string;
  address: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
  license_number: string;
  license_expiration: string;
  photo: string;
}

const schema = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .min(2, constants.form.error.firstNameMin)
      .required(),
    last_name: yup.string().min(2, constants.form.error.lastNameMin).required(),
    // full_name: yup.string().min(2, constants.form.error.fullNameMin).required(),
    address: yup.string().required(),
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
    license_number: yup.string().required(),
    license_expiration: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        constants.form.error.licenseExpirationFormat
      )
      .required(),
  })
  .required();

interface ContainerProps {}

const RegistrationForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMobile, setErrorMobile] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { validateFields } = useValidate();
  const [address, setAddress] = useState("");
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const [images, setImages] = React.useState<any>();
  const maxNumber = 1;

  const [defaultImg, setDefaultImg] = useState(true);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
    setDefaultImg((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const [errorImage, setErrorImage] = useState<any>(Error());

  const throwError = () => {
    throw Error("Please upload a profile photo.");
  };

  const onSubmit = async (data: IFormInputs) => {
    const message = document.getElementById("imageError") as HTMLInputElement;

    try {
      const data1 = { ...data };
      const data2 = { ...data, photo: images[0].photo };
      console.log("onSubmit", data2);
      console.log(images[0].photo);

      // Add address to form data
      // const newFormData = { ...data, address: address };
      // console.log("onsubmit", newFormData);

      // Validate fields
      const response = await validateFields(data1);
      // const response2 = await validateFields(data2);

      if (response.errors) {
        // Prepare errors
        let arrErrors: string[] = [];
        for (let value of Object.values(response.errors)) {
          arrErrors.push("*" + value);
        }
        setApiErrors(arrErrors);
      } else {
        // Set register data on local storage
        localStorage.setItem("oldRegisterUser", JSON.stringify(data2));

        // Navigate to OTP page
        navigate("/registration2");
      }
    } catch (e) {
      console.log(e);
      // setErrorImage(e);
      message.innerHTML =
        "A profile photo is required. Please make sure the image is less than 15MB.";
    }
  };

  const handleClick = (onImageUpload: any) => {
    console.log("aaaa");
    // setDefaultImg((prev) => !prev);
    onImageUpload();
  };

  const handleRemove = (onImageRemove: any, index: any) => {
    onImageRemove(index);
    // setDefaultImg((prev) => !prev);
  };

  return (
    <div>
      <div className="d-flex d-lg-none justify-content-center mb-4">
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={LogoHeader}
              alt="Food Monkey Logo"
              className={styles.logoMain}
            />
            <img
              src={LogoHeaderHover}
              alt="Food Monkey Logo"
              className={styles.logoHover}
            />
          </Link>
        </div>
      </div>

      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInnerContainer}>
          <h3 className="text-center">Personal Information</h3>

          <Row lg={3} xs={1}>
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
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required {...register("last_name")} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  required
                  {...register("address")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row lg={3} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
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
          </Row>

          <Row lg={3} xs={1}>
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

            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Driver's License Number</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("license_number")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Driver's License Expiration</Form.Label>
                <Form.Control
                  className="mb-0"
                  type="text"
                  onKeyUp={() => setError("")}
                  required
                  {...register("license_expiration")}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

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
          <p>{errors.license_number?.message}</p>
          <p>{errors.license_expiration?.message}</p>
          <p>{errors.photo?.message} </p>

          <p id="imageError"></p>
        </div>

        <hr className="" />
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="photo"
          maxFileSize={1572864}
          // acceptType={["jpg", "png"]}
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
                <img src={RiderProfile} style={{ width: "100px" }} />
              ) : (
                imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.photo} className="w-25 img-fluid mb-3" />
                    <div className="image-item__btn-wrapper">
                      <a onClick={() => handleRemove(onImageRemove, index)}>
                        Remove
                      </a>
                    </div>
                  </div>
                ))
              )}
              <Row className="">
                <Col sm={2} md={8}>
                  <input
                    placeholder="Profile Picture (PDF*JPG*PNG)"
                    className={`bg-white ${styles.test}`}
                    disabled
                    // {...register("photo")}
                  />
                </Col>
                <Col>
                  <a
                    className={`${styles.test2}`}
                    onClick={() => handleClick(onImageUpload)}
                  >
                    Browse
                  </a>
                </Col>
              </Row>
              {/* <Row className="">
                <Col sm={2} md={8}>
                  <input
                    placeholder="Driver’s License Image (PDF*JPG*PNG)"
                    className={`bg-white ${styles.test}`}
                    disabled
                  />
                </Col>
                <Col>
                  <a className={`${styles.test2}`} onClick={onImageUpload}>
                    Browse
                  </a>
                </Col>
              </Row> */}
              {/* <div
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
              </div> */}
              <div className="nextBtn">
                <Button
                  variant="warning"
                  size="lg"
                  type="submit"
                  className="mt-4"
                  id="nextBtn-2"
                  // href="/registration2"
                  // onClick={Continue}
                  // disabled={!isValid || !address}
                >
                  Next
                </Button>
              </div>
              {errors && (
                <div>
                  {errors.maxNumber && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "600",
                      }}
                    >
                      Number of selected images exceed.
                    </span>
                  )}
                  {/* {errors.acceptType && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "600",
                      }}
                    >
                      Your selected file type is not allowed.
                    </span>
                  )} */}
                  {errors.maxFileSize && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "600",
                      }}
                    >
                      Selected file size exceeded 15MB.
                    </span>
                  )}
                  {errors.resolution && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "600",
                      }}
                    >
                      Selected file does not match the desired resolution
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </Form>
    </div>
  );
};

export default RegistrationForm;
