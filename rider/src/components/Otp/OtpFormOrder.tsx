import React, { useState, useEffect } from "react";
import { Button, Offcanvas, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

import "./OtpForm.scss";

interface ContainerProps {}

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="custom-lottie text-center p-4">
          <Lottie animationData={otpSuccess} loop={true} />
          <p className="mt-4">OTP Verified Successfully</p>

          <Link
            to="/delivery-status"
            className="custom-btn d-inline-block mt-2"
          >
            Go to Delivery Status
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const OtpForm: React.FC<ContainerProps> = ({}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  const deadline = "October 31,2022";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div className="container">
        <div className="title">
          <h3>Enter OTP</h3>
          <p>We have sent an OTP to your mobile number</p>
        </div>

        <div className="OTP">
          <form
            method="get"
            className="digit-group text-center"
            data-group-name="digits"
            data-autosubmit="false"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="d-flex">
              <input
                type="text"
                id="digit-1"
                name="digit-1"
                data-next="digit-2"
                maxLength={1}
              />
              <input
                type="text"
                id="digit-2"
                name="digit-2"
                data-next="digit-3"
                data-previous="digit-1"
                maxLength={1}
              />
              <input
                type="text"
                id="digit-3"
                name="digit-3"
                data-next="digit-4"
                data-previous="digit-2"
                maxLength={1}
              />
              <input
                type="text"
                id="digit-4"
                name="digit-4"
                data-next="digit-5"
                data-previous="digit-3"
                maxLength={1}
              />
              <input
                type="text"
                id="digit-5"
                name="digit-5"
                data-next="digit-6"
                data-previous="digit-4"
                maxLength={1}
              />
              <input
                type="text"
                id="digit-6"
                name="digit-6"
                data-previous="digit-5"
                maxLength={1}
              />
            </div>

            <div className="otp-expire">
              <p>
                Resend OTP in{" "}
                <span>
                  {minutes}:{seconds}
                </span>
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="custom-btn"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
