import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  PersonCircle,
  StarFill,
  ChevronDoubleRight,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import styles from "./RiderFeedback.module.scss";
import StarButtons from "./StarButtons";
import riderSample from "../../assets/images/rider-sample.png";

interface ContainerProps {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const RiderFeedback: React.FC<ContainerProps> = ({
  modalShow,
  setModalShow,
}) => {
  const MAX_CHARACTERS = 255;
  const [charactersCount, setCharactersCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setCharactersCount(feedback.length);
  }, [feedback]);

  const handleOnClick = () => {
    console.log("handle on click submit review");
    console.log(rating, feedback);
  };

  return (
    <Modal
      size="xl"
      show={modalShow}
      onHide={() => setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.container}
    >
      <Modal.Body>
        <h5 className="text-center mb-3">Rider's Feedback</h5>
        <div className="mx-lg-5">
          <Row lg={2} xs={1}>
            {/* Rider Profile + Star Rating */}
            <Col>
              <div
                className={`d-flex gap-4 align-items-center mt-lg-3 mt-0 ${styles.riderInfoContainer}`}
              >
                {/* <PersonCircle color="#000000" size={130} /> */}
                <img
                  className={`img-fluid ${styles.riderImg}`}
                  src={riderSample}
                  alt=""
                />

                <div className={styles.riderInfo}>
                  <h4 className="mb-0">Valentino Rossi</h4>
                  <p className="mb-2">Yamaha M1-2021 | 947TZC</p>
                  <div className={`d-flex gap-1 ${styles.rating}`}>
                    <StarFill color="#E6B325" size={18} />
                    <StarFill color="#E6B325" size={18} />
                    <StarFill color="#E6B325" size={18} />
                    <StarFill color="#E6B325" size={18} />
                    <StarFill color="#61481C" size={18} />
                  </div>
                </div>
              </div>

              {/* Star Ratings */}
              <div className={`d-flex gap-2 mt-3 ${styles.btnRating}`}>
                <StarButtons value={5} rating={rating} setRating={setRating} />
                <StarButtons value={4} rating={rating} setRating={setRating} />
                <StarButtons value={3} rating={rating} setRating={setRating} />
                <StarButtons value={2} rating={rating} setRating={setRating} />
                <StarButtons value={1} rating={rating} setRating={setRating} />
              </div>
            </Col>

            {/* Rider Feedback Form */}
            <Col className="text-center">
              <Form.Group className={styles.formGroup}>
                <Form.Label>Your Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  maxLength={MAX_CHARACTERS}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <span className={styles.characters}>
                  {charactersCount}/{MAX_CHARACTERS}
                </span>
              </Form.Group>

              <Button
                variant="primary"
                className={styles.btnGray}
                onClick={handleOnClick}
              >
                Submit Feedback
              </Button>

              <div className="mt-2">
                <Link to="feedback" className={styles.linkSkip}>
                  Skip
                  <ChevronDoubleRight color="#A47E3B" size={16} />
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RiderFeedback;
