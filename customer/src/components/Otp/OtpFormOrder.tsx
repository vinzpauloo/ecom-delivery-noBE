import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useOTP } from "../../hooks/useOTP";
import { useIsAuthenticated } from "react-auth-kit";
import formatCountdown from "../../utils/formatCountdown";

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

import OtpInput from "./OtpInput";
import styles from "./OtpForm.module.scss";
import constants from "../../utils/constants.json";
import { useOrders } from "../../hooks/useOrders";

interface ContainerProps {}

const IS_TESTING = process.env.NODE_ENV !== "production";

const OtpSuccessModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4 ${styles.lottie}`}>
          <Lottie animationData={otpSuccess} loop={true} />
          <p className="mt-4">OTP Verified Successfully</p>

          <Link
            to={`/order/${props?.orderid}`}
            className={`d-inline-block mt-2 ${styles.button}`}
          >
            Go to Delivery Status
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

const OtpFormOrder: React.FC<ContainerProps> = () => {
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");
  const [otpCode, setOtpCode] = useState();
  const [multipleErrors, setMultipleErrors] = useState([""]);
  const [counter, setCounter] = useState(constants.otpCountdown);
  const [modalShow, setModalShow] = useState(false);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const { requestOTP, verifyOTP } = useOTP();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { createOrder, createOrderGuest } = useOrders();

  const [otp, setOtp] = useState("");
  const onChange = (value: string) => {
    console.log(otp);
    setOtp(value);
  };

  const { handleSubmit } = useForm();

  // Prepare order object
  const order = localStorage.getItem("order") || "";
  const orderObject = order ? JSON.parse(order) : "";

  const getMobile = () => {
    return orderObject?.mobile;
  };

  useEffect(() => {
    console.log("OtpFormOrder");

    if (!order || !getMobile()) {
      console.log("Missing required details!");
      navigate("/register");
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
      guest: !isAuthenticated(),
    };

    console.log("otpVerifyData", otpVerifyData);

    const response = await verifyOTP(otpVerifyData);
    console.log("response", response);

    if (response.error) {
      // OTP Verification error
      // setError(response.error);
      setModalError(response.error);
      setModalErrorShow(true);
    } else {
      // OTP Verification success
      console.log("OTP Verification success");
      console.log("Creating order ...", orderObject);

      if (isAuthenticated()) {
        /* Create order as logged in user */
        const responseOrder = await createOrder(orderObject);
        console.log("/api/orders", responseOrder);

        if (responseOrder.error) {
          setModalError("Something went wrong when creating order.");
          setModalErrorShow(true);
        } else {
          console.log("Create order success!", responseOrder);

          // Reset localStorage values
          localStorage.removeItem("checkout");
          localStorage.removeItem("order");

          // Set new order id
          setOrderId(responseOrder.id);

          // Show modal after create order
          setModalShow(true);
        }
      } else {
        const guestSession = response.session;

        // Save guest session in local storage
        localStorage.setItem("guestSession", guestSession);

        /* Create order as guest */
        const responseOrder = await createOrderGuest(orderObject, guestSession);
        console.log("/api/orders", responseOrder);

        if (responseOrder.error) {
          setModalError("Something went wrong when creating order.");
          setModalErrorShow(true);
        } else {
          console.log("Create order success!", responseOrder);

          // Reset localStorage values
          localStorage.removeItem("checkout");
          localStorage.removeItem("order");

          // Set new order id
          setOrderId(responseOrder.id);

          // Show modal after create order
          setModalShow(true);
        }
      }
    }
  };

  return (
    <>
      <OtpSuccessModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        orderid={orderId}
      />
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
                        Resend OTP in <span>{formatCountdown(counter)}</span>
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

export default OtpFormOrder;
