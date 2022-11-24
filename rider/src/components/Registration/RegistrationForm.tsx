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
  .object({
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
      .min(6, constants.form.error.passwordMin)
      .max(16, constants.form.error.passwordMax)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], constants.form.error.passwordConfirm)
      .required(),
    license_number: yup.string().required(),
    license_expiration: yup.string().required(),
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
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const [images, setImages] = React.useState<any>();
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    const data2 = { ...data, photo2: images[0].photo };
    console.log("onSubmit", data2);
    console.log(images[0].photo);
    // Validate fields
    const response = await validateFields(data2);

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
          <p>{errorEmail}</p>
          <p>{errorMobile}</p>
          <p>{errors.address?.message}</p>
          <p>{errors.last_name?.message}</p>
          <p>{errors.mobile?.message}</p>
          <p>{errors.email?.message}</p>
          <p>{errors.password?.message}</p>
          <p>{errors.password_confirmation?.message}</p>
          <p>{errors.license_number?.message}</p>
          <p>{errors.license_expiration?.message}</p>
        </div>

        <hr className="d-none d-lg-block" />
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="photo"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.photo} className="w-25 img-fluid mb-3" />
                  <div className="image-item__btn-wrapper">
                    <a onClick={() => onImageRemove(index)}>Remove</a>
                  </div>
                </div>
              ))}
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
                  <a className={`${styles.test2}`} onClick={onImageUpload}>
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
              <div className="nextBtn">
                {/* <Link to="/registration2">
            
          </Link> */}

                <Button
                  variant="warning"
                  size="lg"
                  type="submit"
                  className="mt-4"
                  id="nextBtn-2"
                  // href="/registration2"
                  // onClick={Continue}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </ImageUploading>
      </Form>
    </div>
  );
};

export default RegistrationForm;
