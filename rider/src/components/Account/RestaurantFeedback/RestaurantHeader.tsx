import React from "react";
import { Row, Col } from "react-bootstrap";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

import styles from "./RestaurantHeader.module.scss";

interface ContainerProps {
  restaurantHeader: any;
  riderRating: any;
}

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

const RestaurantHeader: React.FC<ContainerProps> = ({
  restaurantHeader,
  riderRating,
}) => {
  return (
    <div className={styles.container}>
      <Row>
        <Col lg={4} md={5}>
          <div
            className={`d-flex gap-3 align-items-center ${styles.restaurantProfile}`}
          >
            <img
              src={restaurantHeader?.rider_photo}
              className="img-fluid"
              alt=""
            />
            <div>
              <h2>
                {restaurantHeader?.rider_first_name}{" "}
                {restaurantHeader?.rider_last_name}
              </h2>
              <p className="mb-2">{restaurantHeader?.rider_average_rating}</p>
              <div className={`d-flex gap-1 ${styles.rating}`}>
                <AverageRating rating={riderRating?.rider_average_rating} />
              </div>
            </div>
          </div>
        </Col>

        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 0 }}>
          <div className={styles.restaurantContent}>
            <p>{restaurantHeader?.mobile}</p>
            <p>{restaurantHeader?.email}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantHeader;
