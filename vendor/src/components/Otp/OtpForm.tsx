import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useOTP } from "../../hooks/useOTP";
import { useSignIn } from "react-auth-kit";
import { useCalculateHash } from "../../hooks/useCalculateHash";

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

import styles from "./OtpForm.module.scss";
import constants from "../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  num1: number;
  num2: number;
  num3: number;
  num4: number;
  num5: number;
  num6: number;
}

const schema = yup
  .object({
    num1: yup.number().required().typeError(constants.form.error.notNumber),
    num2: yup.number().required().typeError(constants.form.error.notNumber),
    num3: yup.number().required().typeError(constants.form.error.notNumber),
    num4: yup.number().required().typeError(constants.form.error.notNumber),
    num5: yup.number().required().typeError(constants.form.error.notNumber),
    num6: yup.number().required().typeError(constants.form.error.notNumber),
  })
  .required();

interface ContainerProps {}

const OtpSuccessModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4 ${styles.lottie}`}>
          <Lottie animationData={otpSuccess} loop={true} />
          <p className="mt-4">OTP Verified Successfully</p>

          <Link
            to="/account"
            className={`d-inline-block mt-2 ${styles.button}`}
          >
            Back to Home Page
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const formatCounter = (counter: number) => {
  return counter < 10 ? "0" + counter : counter;
};

const OtpForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [otpCode, setOtpCode] = useState();
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const [counter, setCounter] = useState(30);
  const [modalShow, setModalShow] = useState(false);
  const { requestOTP, verifyOTP } = useOTP();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { calculateHash } = useCalculateHash();
  let otpRequestData = {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // Prepare mobile number
  const registerUser = localStorage.getItem("registerUser") || "";

  const getMobile = () => {
    return JSON.parse(registerUser)?.mobile;
  };

  useEffect(() => {
    console.log("OtpForm");

    if (!registerUser) {
      console.log("Register user not found!!!");
      navigate("/registration");
      return;
    }

    if (!getMobile()) {
      console.log("Mobile number not found!!!");
      navigate("/registration");
      return;
    }
    handleSendOTP();
  }, []);

  // Countdown timer
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // Send OTP request
  const handleSendOTP = async () => {
    const otpRequestData = {
      mobile: getMobile(),

      /* Remove in production */
      testing: true,
    };

    // Reset counter & errors
    setCounter(30);
    setError("");

    console.log("Requesting otp ...", otpRequestData);

    const response = await requestOTP(otpRequestData);
    console.log("handleSendOTP response", response);
    setOtpCode(response.code);
  };

  // Verify OTP request
  const onSubmit = async (data: IFormInputs) => {
    console.log("onSubmit", data);
    console.log("mobile", getMobile());

    let otpNumber =
      "" +
      data.num1 +
      data.num2 +
      data.num3 +
      data.num4 +
      data.num5 +
      data.num6;

    const otpVerifyData = {
      mobile: getMobile(),
      code: parseInt(otpNumber),
      guest: false,
    };

    console.log("otpVerifyData", otpVerifyData);

    const response = await verifyOTP(otpVerifyData);
    console.log("response", response);

    if (response.error) {
      // OTP Verification error
      setError(response.error);
    } else {
      // OTP Verification success
      console.log("OTP Verification success");
      console.log("Registering new user ...", JSON.parse(registerUser));

      /* Register user */
      try {
        // START: Access register API
        const registerData = JSON.parse(registerUser);
        const endpoint = "api/merchant/register";
        const options = {
          headers: {
            "X-Authorization": calculateHash(endpoint, registerData),
          },
          withCredentials: true,
        };

        const response = await axios.post(endpoint, registerData, options);
        // END: Access register API

        console.log("/merchant/register", response);

        if (response.status === 201) {
          const { data } = response.data;

          console.log("Register success!", response);

          // Show modal after register
          setModalShow(true);

          signIn({
            token: data.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: data.user,
          });
        }
      } catch (err) {
        if (err && err instanceof AxiosError) {
          if (err.response && err.response.data.errors) {
            // Multiple errors from the backend
            let tempErrors: any[] = [];
            for (const [key, value] of Object.entries(
              err.response.data.errors
            )) {
              tempErrors.push(value);
            }
            setMultipleErrors(tempErrors);
          } else {
            // Single error
            setError("*" + err.response?.data.message);
          }
        } else if (err && err instanceof Error) setError(err.message);

        console.log("Error", err);
      }
    }
  };

  return (
    <>
      <OtpSuccessModal show={modalShow} onHide={() => setModalShow(false)} />

      <div className="text-center">
        <div className={styles.title}>
          <h3>Enter OTP</h3>
          <p>We have sent an OTP to your mobile number</p>
        </div>

        <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="d-flex justify-content-center gap-3 gap-lg-5">
              <Form.Control
                type="text"
                maxLength={1}
                onKeyUp={() => setError("")}
                required
                {...register("num1")}
              />
              <Form.Control
                type="text"
                maxLength={1}
                onKeyUp={() => setError("")}
                required
                {...register("num2")}
              />
              <Form.Control
                type="text"
                maxLength={1}
                onKeyUp={() => setError("")}
                required
                {...register("num3")}
              />
              <Form.Control
                type="text"
                maxLength={1}
                onKeyUp={() => setError("")}
                required
                {...register("num4")}
              />
              <Form.Control
                type="text"
                maxLength={1}
                onKeyUp={() => setError("")}
                required
                {...register("num5")}
              />
              <Form.Control
                type="text"
                maxLength={1}
                onKeyUp={() => setError("")}
                required
                {...register("num6")}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={{ span: 8, offset: 2 }}>
              <div className={styles.countdown}>
                <div className="position-relative text-center text-lg-start my-5">
                  {/* Error messages */}
                  <div className={styles.errors}>
                    <p>{error}</p>
                    <p>{errors.num1?.message}</p>
                    <p>{errors.num2?.message}</p>
                    <p>{errors.num3?.message}</p>
                    <p>{errors.num4?.message}</p>
                    <p>{errors.num5?.message}</p>
                    <p>{errors.num6?.message}</p>

                    {/* Errors from backend */}
                    {multipleErrors.map((item, index) => {
                      return <p key={index}>{item}</p>;
                    })}
                  </div>

                  <p className="mb-0 text-lg-end">
                    {counter ? (
                      <>
                        Resend OTP in <span>00:{formatCounter(counter)}</span>
                      </>
                    ) : (
                      <Link to="#" onClick={handleSendOTP}>
                        Click to Resend OTP
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className={styles.button}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div>
        <h6 className="mt-4 text-center text-success">
          For testing only.
          <br />
          OTP Code: {otpCode}
        </h6>
      </div>
    </>
  );
};

export default OtpForm;
