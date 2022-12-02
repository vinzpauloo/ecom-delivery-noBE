import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  PersonCircle,
  StarFill,
  StarHalf,
  Star,
  ChevronDoubleRight,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useReviews } from "../../hooks/useReviews";

import styles from "./RiderFeedback.module.scss";
import constants from "../../utils/constants.json";
import StarButtons from "./StarButtons";

interface ContainerProps {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  rider?: TRider;
}

type TRider = {
  order_id?: number;
  rider_id?: number;
  rider_name?: string;
  rider_photo?: string;
  rider_vehicle_brand?: string;
  rider_vehicle_model?: string;
  rider_average_rating?: number;
  plate_number?: string;
};

const AverageRating = ({ rating = 0 }: { rating: number | undefined }) => {
  const thisRate = Math.ceil(rating);
  const thisRemainder = rating % 1;

  if (!rating)
    return (
      <>
        {[...Array(5 - thisRate)]?.map((e, i) => (
          <Star key={i} color="#E6B325" size={18} />
        ))}
      </>
    );

  return (
    <>
      {[...Array(thisRate - 1)]?.map((e, i) => (
        <StarFill key={i} color="#E6B325" size={18} />
      ))}

      {thisRemainder ? (
        <StarHalf color="#E6B325" size={18} />
      ) : (
        <StarFill color="#E6B325" size={18} />
      )}

      {[...Array(5 - thisRate)]?.map((e, i) => (
        <Star key={i} color="#E6B325" size={18} />
      ))}
    </>
  );
};

const RiderFeedback: React.FC<ContainerProps> = ({
  modalShow,
  setModalShow,
  rider,
}) => {
  const MAX_CHARACTERS = 255;
  const [charactersCount, setCharactersCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const { reviewRider } = useReviews();
  const navigate = useNavigate();

  useEffect(() => {
    setCharactersCount(feedback.length);
  }, [feedback]);

  const handleOnClick = async () => {
    if (!rating) {
      alert(constants.form.error.reviewRating);
      return;
    }

    if (!feedback) {
      alert(constants.form.error.reviewFeedback);
      return;
    }

    const data = {
      rider_rating: rating,
      rider_review: feedback,
    };

    console.log("Submitting rider review ...");
    console.log(rider?.order_id, data);

    const response = await reviewRider(rider?.order_id, data);
    console.log("reviewRider response", response);

    if (!response.error) {
      alert(constants.form.success.reviewRider);

      //  Redirect to restaurant feedback page
      navigate("feedback");
    } else {
      alert(response.error);
    }
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
                {rider?.rider_photo ? (
                  <img
                    className={`img-fluid ${styles.riderImg}`}
                    src={rider?.rider_photo}
                    alt=""
                  />
                ) : (
                  <PersonCircle color="#000000" size={130} />
                )}

                <div className={styles.riderInfo}>
                  <h4 className="mb-0">{rider?.rider_name}</h4>
                  <p className="mb-2">
                    {rider?.rider_vehicle_brand} {rider?.rider_vehicle_model} |{" "}
                    {rider?.plate_number?.toUpperCase()}
                  </p>
                  <div className={`d-flex gap-1 ${styles.rating}`}>
                    <AverageRating rating={rider?.rider_average_rating} />
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
