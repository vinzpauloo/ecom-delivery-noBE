import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

import styles from "./OtpForm.module.scss";

interface ContainerProps {}

const OtpSuccessModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4 ${styles.lottie}`}>
          <Lottie animationData={otpSuccess} loop={true} />
          <p className="mt-4">OTP Verified Successfully</p>

          <Link
            to="/delivery-status"
            className={`d-inline-block mt-2 ${styles.button}`}
          >
            Go to Delivery Status
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const OtpFormOrder: React.FC<ContainerProps> = ({}) => {
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalShow(true);
  };

  return (
    <>
      <OtpSuccessModal show={modalShow} onHide={() => setModalShow(false)} />

      <div className="text-center">
        <div className={styles.title}>
          <h3>Enter OTP</h3>
          <p>We have sent an OTP to your mobile number</p>
        </div>

        <Form className={styles.form} onSubmit={handleSubmit}>
          <Row>
            <Col className="d-flex justify-content-center gap-3 gap-lg-5">
              <Form.Control id="num1" name="num1" type="text" maxLength={1} />
              <Form.Control id="num2" name="num2" type="text" maxLength={1} />
              <Form.Control id="num3" name="num3" type="text" maxLength={1} />
              <Form.Control id="num4" name="num4" type="text" maxLength={1} />
              <Form.Control id="num5" name="num5" type="text" maxLength={1} />
              <Form.Control id="num6" name="num6" type="text" maxLength={1} />
            </Col>
          </Row>

          <Row>
            <Col lg={{ span: 8, offset: 2 }}>
              <div className={styles.countdown}>
                <p className="text-center text-lg-end my-5">
                  Resend OTP in <span>00:30</span>
                </p>
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
    </>
  );
};

export default OtpFormOrder;
