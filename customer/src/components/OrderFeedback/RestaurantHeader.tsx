import React from "react";
import { Row, Col } from "react-bootstrap";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

import styles from "./RestaurantHeader.module.scss";

interface ContainerProps {
  restaurantHeader: any;
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

const RestaurantHeader: React.FC<ContainerProps> = ({ restaurantHeader }) => {
  return (
    <div className={styles.container}>
      <Row>
        <Col lg={4} md={5}>
          <div
            className={`d-flex gap-3 align-items-center ${styles.restaurantProfile}`}
          >
            <img
              src={restaurantHeader?.restaurant_photo}
              className="img-fluid"
              alt=""
            />
            <div>
              <h2>{restaurantHeader?.restaurant_name}</h2>
              <p className="mb-2">{restaurantHeader?.restaurant_address}</p>
              <div className={`d-flex gap-1 ${styles.rating}`}>
                <AverageRating
                  rating={restaurantHeader?.restaurant_average_rating}
                />
              </div>
            </div>
          </div>
        </Col>

        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 0 }}>
          <div className={styles.restaurantContent}>
            <h4>What is the {restaurantHeader?.restaurant_name}?</h4>
            <p>{restaurantHeader?.restaurant_description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantHeader;
