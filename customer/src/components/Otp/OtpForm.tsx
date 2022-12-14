import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useOTP } from "../../hooks/useOTP";
import { useSignIn } from "react-auth-kit";
import { useUser } from "../../hooks/useUser";
import { getCountdown } from "../../utils/formatCountdown";

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

import OtpInput from "./OtpInput";
import styles from "./OtpForm.module.scss";
import constants from "../../utils/constants.json";

interface ContainerProps {}

const IS_TESTING = process.env.NODE_ENV !== "production";

const OtpForm: React.FC<ContainerProps> = () => {
  const [modalError, setModalError] = useState("");
  const [otpCode, setOtpCode] = useState();
  const [otpErrorCount, setOtpErrorCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const { requestOTP, verifyOTP } = useOTP();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { createUser } = useUser();

  const [otp, setOtp] = useState("");
  const onChange = (value: string) => {
    setOtp(value);
  };

  const { handleSubmit } = useForm();

  // Prepare mobile number
  const registerUser = localStorage.getItem("registerUser") || "";

  const getMobile = () => {
    return JSON.parse(registerUser)?.mobile;
  };

  // New countdown timer logic
  let timer: any;
  useEffect(() => {
    timer = setInterval(() => {
      if (counter > 0) setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (!registerUser || !getMobile()) {
      // console.log("Missing required details!");
      navigate("/register");
      return;
    }

    handleSendOTP();
  }, []);

  // Send OTP request
  const handleSendOTP = async () => {
    const otpRequestData = {
      mobile: getMobile(),
      testing: IS_TESTING,
    };

    // Reset counter & errors
    setCounter(constants.otpCountdown);
    setModalError("");
    setOtpErrorCount(0);

    const response = await requestOTP(otpRequestData);
    // console.log("handleSendOTP response", response);

    // OTP request limit error
    if (response.status === 429) {
      setIsBlocked(true);
      setModalError(response.message);
      setModalErrorShow(true);
    } else {
      setOtpCode(response.code);
    }
  };

  // Verify OTP request
  const onSubmit = async () => {
    if (!otp) {
      setModalError(constants.form.error.missingOtp);
      setModalErrorShow(true);
      return;
    }

    const otpVerifyData = {
      mobile: getMobile(),
      code: parseInt(otp),
      guest: false,
    };

    // console.log("onSubmit", otpVerifyData);

    const response = await verifyOTP(otpVerifyData);
    // console.log("response", response);

    if (response.error) {
      // OTP Verification error
      setModalError(response.error);
      setModalErrorShow(true);
      setOtpErrorCount(otpErrorCount + 1);

      // Check if error count is 3, reset counter to request new OTP
      if (otpErrorCount >= 3) {
        // console.log("Error count = ", otpErrorCount);
        setCounter(0);
        setOtp("");
      }
    } else {
      // OTP Verification success
      // console.log("Registering new user ...", JSON.parse(registerUser));

      const response = await createUser(JSON.parse(registerUser));
      // console.log("createUser response", response);

      if (!response.error) {
        // console.log("Register success!", response);

        // Reset localStorage values
        localStorage.removeItem("registerUser");

        // Show modal after register
        setModalShow(true);

        // Login with react-auth-kit
        signIn({
          token: response.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: response.user,
        });
      } else {
        setModalError(response.error);
        setModalErrorShow(true);
      }
    }
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onExiting={() => navigate("/")}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
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

      <Modal
        show={modalErrorShow}
        onHide={() => setModalErrorShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center p-4 ${styles.lottie}`}>
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

      {isBlocked ? (
        <div className="text-center">
          <div className={styles.title}>
            <h3>You have reached the OTP limit.</h3>
            <p>Please try again later.</p>
          </div>
        </div>
      ) : (
        <>
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
                    disabled={counter == 0}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          {IS_TESTING && counter ? (
            <h6 className="mt-4 text-center text-success">
              For testing only.
              <br />
              OTP Code: {otpCode}
            </h6>
          ) : null}
        </>
      )}
    </>
  );
};

export default OtpForm;
