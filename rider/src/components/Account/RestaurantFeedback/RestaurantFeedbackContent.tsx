import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Row, Container, Modal } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
// import { useRestaurants } from "../../../hooks/useRestaurants";
import { useReviews } from "../../../hooks/useReviews";
import { useUser } from "../../../hooks/useUser";
// import { getDate } from "../../../utils/formatDate";

import styles from "./RestaurantFeedbackContent.module.scss";
import placeholder from "../../../assets/images/placeholder.png";
import RestaurantHeader from "./RestaurantHeader";
interface ContainerProps {}

// type personalFeedback = {
//   first_name: string;
//   last_name: string;
//   restaurant_rating: number;
//   restaurant_review: string;
//   restaurant_reviewed_at: string;
// };

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

const RestaurantFeedbackContent: React.FC<ContainerProps> = () => {
  // const [restaurant, setRestaurant] = useState<any>();
  // const [reviews, setReviews] = useState<any[]>();
  // const { getRestaurantsById } = useRestaurants();
  const { getRiderReviews } = useReviews();
  const [showModal, setShowModal] = useState(false);
  // const [personalFeedback, setPersonalFeedback] =
  //   useState<personalFeedback | null>(null);
  const [filter, setFilter] = useState(0);
  const { getUser } = useUser();
  const [rider, setRider] = useState<any>();
  const [rating, setRating] = useState<any>();

  // Get the params from the URL
  const { id } = useParams();

  // Get user request
  const loadUser = async () => {
    console.log("Requesting getUser ...");

    const response = await getUser();
    console.log("getUser response", response);
    let defaultValues = {
      first_name: response.rider.first_name,
      last_name: response.rider.last_name,
      address: response.rider.rider.address,
      email: response.rider.email,
      mobile: response.rider.mobile,
      brand: response.rider.rider.brand,
      model: response.rider.rider.model,
      or_number: response.rider.rider.or_number,
      plate_number: response.rider.rider.plate_number,
      license_expiration: response.rider.rider.license_expiration,
      license_number: response.rider.rider.license_number,
      license_type: response.rider.license_type,
      year: response.rider.year,
      rider_photo: response.rider.photo,
      rider_first_name: response.rider.first_name,
      rider_last_name: response.rider.last_name,
    };

    setRider(defaultValues);
  };

  // const loadRestaurantReviews = async () => {
  //   const response = await getRestaurantReviewsById(id, { reviews: "true" });
  //   console.log("getRestaurantReviewsById response", response);

  //   setReviews(response.reviews);
  // };

  const loadRiderReviews = async () => {
    const response = await getRiderReviews(id);
    console.log("riderReviews", response);

    const riderRating = {
      rider_average_rating: response.rider_rating,
      customer_first_name: response.customer_first_name,
      customer_last_name: response.customer_last_name,
      id: response.id,
      rider_review: response.rider_review,
    };
    console.log(response.rider_rating);
    setRating(riderRating);
  };

  const handleClick = () => {
    setShowModal(true);
    // setPersonalFeedback(item);
  };

  useEffect(() => {
    // loadRestaurant();
    // loadRestaurantReviews();
    loadUser();
    loadRiderReviews();
  }, []);

  return (
    <>
      <RestaurantHeader restaurantHeader={rider} riderRating={rating} />
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
        {/* {filter === 0
          ? reviews?.map((item, index) => {
            return ( */}
        {rating?.rider_review ? (
          <div className={styles.listItem}>
            <hr />
            <div className="d-flex gap-2">
              <img src={placeholder} alt="" />
              <div className={styles.rating}>
                <h4 className="mb-0">
                  {rating?.customer_first_name} {rating?.customer_last_name}
                </h4>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomerRating rating={rating?.rider_average_rating} />
                </div>
              </div>
            </div>
            <p className="mb-0 mt-2">
              {rating?.rider_review}{" "}
              <span className={styles.seeMore} onClick={handleClick}>
                See more...
              </span>
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center", fontWeight: "600" }}>
            No review for this order.
          </p>
        )}

        {/* : reviews
              ?.filter((item) => item.restaurant_rating === filter)
              ?.map((item, index) => {
                return ( */}
        {/* <div className={styles.listItem}>
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
                  </div> */}
        {/* );
               })} */}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Container className={styles.modalContainer}>
          <div className="d-flex gap-2">
            <img src={placeholder} alt="" />
            <div className={styles.rating}>
              <h4 className="mb-0">
                {rating?.customer_first_name} {rating?.customer_last_name}
              </h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CustomerRating rating={rating?.rider_average_rating} /> {" | "}
              </div>
            </div>
          </div>
          <p className="mb-0 mt-3">{rating?.rider_review} </p>
        </Container>
      </Modal>
    </>
  );
};

export default RestaurantFeedbackContent;
