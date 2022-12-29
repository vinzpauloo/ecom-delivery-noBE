import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Row, Container, Modal } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import { useRestaurants } from "../../../hooks/useRestaurants";
import { useReviews } from "../../../hooks/useReviews";
import { getDate } from "../../../utils/formatDate";

import styles from "./RestaurantFeedbackContent.module.scss";
import placeholder from "../../../assets/images/placeholder.png";
import RestaurantHeader from "./RestaurantHeader";
interface ContainerProps {}

type personalFeedback = {
  first_name: string;
  last_name: string;
  restaurant_rating: number;
  restaurant_review: string;
  restaurant_reviewed_at: string;
  photo: [{ photo: string }];
};

const CustomerRating = ({ rating = 0 }: { rating: number | undefined }) => {
  const thisRate = Math.ceil(rating);

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
      {[...Array(thisRate)]?.map((e, i) => (
        <StarFill key={i} color="#E6B325" size={18} />
      ))}

      {[...Array(5 - thisRate)]?.map((e, i) => (
        <Star key={i} color="#E6B325" size={18} />
      ))}
    </>
  );
};

const RestaurantFeedbackContent: React.FC<ContainerProps> = ({}) => {
  const [restaurant, setRestaurant] = useState<any>();
  const [reviews, setReviews] = useState<any[]>();
  const { getRestaurantsById } = useRestaurants();
  const { getRestaurantReviewsById } = useReviews();
  const [showModal, setShowModal] = useState(false);
  const [personalFeedback, setPersonalFeedback] =
    useState<personalFeedback | null>(null);
  const [filter, setFilter] = useState(0);

  // Get the params from the URL
  const { id } = useParams();

  const loadRestaurant = async () => {
    const response = await getRestaurantsById(id);
    // *console.log("getRestaurantsById response", response);

    const thisRestaurant = {
      restaurant_id: response.id,
      restaurant_name: response.name,
      restaurant_description: response.description,
      restaurant_address: response.address,
      restaurant_photo: response.photo,
      restaurant_average_rating: response.rating,
    };

    setRestaurant(thisRestaurant);
  };

  const loadRestaurantReviews = async () => {
    const response = await getRestaurantReviewsById(id, { reviews: "true" });
    // *console.log("getRestaurantReviewsById response", response);

    setReviews(response.reviews);
  };

  const handleClick = (item) => {
    setShowModal(true);
    setPersonalFeedback(item);
  };

  useEffect(() => {
    loadRestaurant();
    loadRestaurantReviews();
  }, []);

  return (
    <>
      <RestaurantHeader restaurantHeader={restaurant} />
      <Row>
        <Container className="pt-3 d-flex align-items-center justify-content-center">
          <span>
            <Button
              className={`${styles.button} ${
                filter === 0 ? `${styles.activeBtn}` : null
              } ms-3 me-3`}
              onClick={() => setFilter(0)}
            >
              All
            </Button>
            <Button
              className={`${styles.button} ${
                filter === 5 ? `${styles.activeBtn}` : null
              } ms-3 me-3`}
              onClick={() => setFilter(5)}
            >
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
            </Button>
            <Button
              className={`${styles.button} ${
                filter === 4 ? `${styles.activeBtn}` : null
              } ms-3 me-3`}
              onClick={() => setFilter(4)}
            >
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
            </Button>
            <Button
              className={`${styles.button} ${
                filter === 3 ? `${styles.activeBtn}` : null
              } ms-3 me-3`}
              onClick={() => setFilter(3)}
            >
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
            </Button>
            <Button
              className={`${styles.button} ${
                filter === 2 ? `${styles.activeBtn}` : null
              } ms-3 me-3`}
              onClick={() => setFilter(2)}
            >
              <StarFill className={`${styles.star} ms-1 me-1`} />
              <StarFill className={`${styles.star} ms-1 me-1`} />
            </Button>
            <Button
              className={`${styles.button} ${
                filter === 1 ? `${styles.activeBtn}` : null
              } ms-3 me-3`}
              onClick={() => setFilter(1)}
            >
              <StarFill className={`${styles.star} ms-1 me-1`} />
            </Button>
          </span>
        </Container>
      </Row>
      <div className={styles.list}>
        {filter === 0
          ? reviews?.map((item, index) => {
              return (
                <div key={index} className={styles.listItem}>
                  <hr />
                  <div className="d-flex gap-2">
                    <img src={placeholder} />
                    <div className={styles.rating}>
                      <h4 className="mb-0">
                        {item?.first_name} {item?.last_name}
                      </h4>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CustomerRating rating={item.restaurant_rating} />{" "}
                        {" | "}
                        {item.restaurant_reviewed_at.split(" ")[0]}
                      </div>
                    </div>
                  </div>
                  <p className="mb-0 mt-2">
                    {item.restaurant_review}{" "}
                    <span
                      className={styles.seeMore}
                      onClick={() => handleClick(item)}
                    >
                      See more...
                    </span>
                  </p>
                </div>
              );
            })
          : reviews
              ?.filter((item) => item.restaurant_rating === filter)
              ?.map((item, index) => {
                return (
                  <div key={index} className={styles.listItem}>
                    <hr />
                    <div className="d-flex gap-2">
                      <img src={placeholder} />
                      <div className={styles.rating}>
                        <h4 className="mb-0">
                          {item?.first_name} {item?.last_name}
                        </h4>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CustomerRating rating={item.restaurant_rating} />{" "}
                          {" | "}
                          {item.restaurant_reviewed_at.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                    <p className="mb-0 mt-2">
                      {item.restaurant_review}{" "}
                      <span
                        className={styles.seeMore}
                        onClick={() => handleClick(item)}
                      >
                        See more...
                      </span>
                    </p>
                  </div>
                );
              })}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Container className={styles.modalContainer}>
          <div className="d-flex gap-2">
            <img src={placeholder} className={styles.profile} />
            <div className={styles.rating}>
              <h4 className="mb-0">
                {personalFeedback?.first_name} {personalFeedback?.last_name}
              </h4>
              <div className="d-flex gap-2 align-items-center">
                <div>
                  <CustomerRating
                    rating={personalFeedback?.restaurant_rating}
                  />
                </div>
                <span className={styles.dateLabel}>
                  {getDate(personalFeedback?.restaurant_reviewed_at || "")}
                </span>
              </div>
            </div>
          </div>
          <p className="mb-0 mt-3">{personalFeedback?.restaurant_review}</p>
          <div className={styles.preview}>
            {personalFeedback?.photo.map((photo, index) => (
              <div key={index} className={styles.imgContainer}>
                <img key={index} src={photo.photo} alt="Preview" />
              </div>
            ))}
          </div>
        </Container>
      </Modal>
    </>
  );
};

export default RestaurantFeedbackContent;
