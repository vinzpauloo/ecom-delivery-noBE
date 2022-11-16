import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useOTP } from "../../hooks/useOTP";
import { useSignIn } from "react-auth-kit";
import { useCalculateHash } from "../../hooks/useCalculateHash";
import { useHelper } from "../../hooks/useHelper";

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

import OtpInput from "./OtpInput";
import styles from "./OtpForm.module.scss";
import constants from "../../utils/constants.json";

interface ContainerProps {}

const IS_TESTING = process.env.NODE_ENV !== "production";

const OtpSuccessModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4 ${styles.lottie}`}>
          <Lottie animationData={otpSuccess} loop={true} />
          <p className="mt-4">OTP Verified Successfully</p>

          <Link to="/" className={`d-inline-block mt-2 ${styles.button}`}>
            Back to Home Page
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const OtpErrorModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4 ${styles.lottie}`}>
          {/* <Lottie animationData={otpSuccess} loop={true} /> */}
          <h4 className="mt-4 text-danger">Oops!</h4>
          <p className="mt-4">{props?.modalerror}</p>

          <Link
            to="#"
            className={`d-inline-block mt-2 ${styles.button}`}
            onClick={() => props?.setmodalerrorshow(false)}
          >
            Close
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const OtpForm: React.FC<ContainerProps> = () => {
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");
  const [otpCode, setOtpCode] = useState();
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const [counter, setCounter] = useState(constants.otpCountdown);
  const [modalShow, setModalShow] = useState(false);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const { requestOTP, verifyOTP } = useOTP();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { calculateHash } = useCalculateHash();
  const { getCountdown } = useHelper();

  const [otp, setOtp] = useState("");
  const onChange = (value: string) => {
    console.log(otp);
    setOtp(value);
  };

  const { handleSubmit } = useForm();

  // Prepare mobile number
  const registerUser = localStorage.getItem("registerUser") || "";

  const getMobile = () => {
    return JSON.parse(registerUser)?.mobile;
  };

  useEffect(() => {
    console.log("OtpForm");

    if (!registerUser || !getMobile()) {
      console.log("Missing required details!");
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
      testing: IS_TESTING,
    };

    // Reset counter & errors
    setCounter(constants.otpCountdown);
    setError("");

    console.log("Requesting otp ...", otpRequestData);

    const response = await requestOTP(otpRequestData);
    console.log("handleSendOTP response", response);
    setOtpCode(response.code);
  };

  // Verify OTP request
  const onSubmit = async () => {
    console.log("inside onSubmit");

    if (!otp) {
      setModalError(constants.form.error.missingOtp);
      setModalErrorShow(true);
      return;
    }

    console.log("onSubmit", otp);
    console.log("mobile", getMobile());

    const otpVerifyData = {
      mobile: getMobile(),
      code: parseInt(otp),
      guest: false,
    };

    console.log("otpVerifyData", otpVerifyData);

    const response = await verifyOTP(otpVerifyData);
    console.log("response", response);

    if (response.error) {
      // OTP Verification error
      // setError(response.error);
      setModalError(constants.form.error.missingOtp);
      setModalErrorShow(true);
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
            for (const [value] of Object.entries(err.response.data.errors)) {
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
      <OtpErrorModal
        show={modalErrorShow}
        onHide={() => setModalErrorShow(false)}
        modalerror={modalError}
        setmodalerrorshow={setModalErrorShow}
      />

      <div className="text-center">
        <div className={styles.title}>
          <h3>Enter OTP</h3>
          <p>We have sent an OTP to your mobile number</p>
        </div>

        <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <OtpInput value={otp} valueLength={6} onChange={onChange} />
            </Col>
          </Row>

          <Row>
            <Col lg={{ span: 8, offset: 2 }}>
              <div className={styles.countdown}>
                <div className="position-relative text-center text-lg-start my-5">
                  {/* Error messages */}
                  <div className={styles.errors}>
                    <p>{error}</p>

                    {/* Errors from backend */}
                    {multipleErrors.map((item, index) => {
                      return <p key={index}>{item}</p>;
                    })}
                  </div>

                  <p className="mb-0 text-lg-end">
                    {counter ? (
                      <>
                        Resend OTP in <span>{getCountdown(counter)}</span>
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

      {IS_TESTING ? (
        <h6 className="mt-4 text-center text-success">
          For testing only.
          <br />
          OTP Code: {otpCode}
        </h6>
      ) : null}
    </>
  );
};

export default OtpForm;
