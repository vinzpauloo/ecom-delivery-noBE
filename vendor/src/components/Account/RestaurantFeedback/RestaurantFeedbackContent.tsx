import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Container, Modal } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import { useRestaurants } from "../../../hooks/useRestaurants";
import { useReviews } from "../../../hooks/useReviews";
import { getDate } from "../../../utils/formatDate";

import styles from "./RestaurantFeedbackContent.module.scss";
import placeholder from "../../../assets/images/placeholder.png";
import constants from "../../../utils/constants.json";
import RestaurantHeader from "./RestaurantHeader";
interface ContainerProps {}

type personalFeedback = {
  first_name: string;
  last_name: string;
  restaurant_rating: number;
  restaurant_review: string;
  restaurant_reviewed_at: string;
}

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
  const [personalFeedback, setPersonalFeedback] = useState<personalFeedback | null>(null);
  const navigate = useNavigate();

  // Get the params from the URL
  const { id } = useParams();

  const loadRestaurant = async () => {
    const response = await getRestaurantsById(id);
    console.log("getRestaurantsById response", response);

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
    console.log("getRestaurantReviewsById response", response);

    setReviews(response.reviews);
  };

  const handleClick = (item) => {
    setShowModal(true);
    setPersonalFeedback(item);
  }

  useEffect(() => {
    loadRestaurant();
    loadRestaurantReviews();
  }, []);
  console.log("@@@",personalFeedback);
  return (
    <>
      <RestaurantHeader restaurantHeader={restaurant} />
      <Row>
        <Container className="pt-3 d-flex align-items-center justify-content-center">
          <span>
            <Button className={`${styles.button} ms-3 me-3`}>All</Button>
            <Button className={`${styles.button} ms-3 me-3`}>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
            </Button>
            <Button className={`${styles.button} ms-3 me-3`}>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
            </Button>
            <Button className={`${styles.button} ms-3 me-3`}>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
            </Button>
            <Button className={`${styles.button} ms-3 me-3`}>
              <Star className={`${styles.star} ms-1 me-1`}/>
              <Star className={`${styles.star} ms-1 me-1`}/>
            </Button>
            <Button className={`${styles.button} ms-3 me-3`}>
              <Star className={`${styles.star} ms-1 me-1`}/>
            </Button>
          </span>
        </Container>
      </Row>
      <div className={styles.list}>
        {reviews?.map((item, index) => {
          return (
            <div key={index} className={styles.listItem}>
              <hr />
              <div className="d-flex gap-2">
                <img src={placeholder} />
                <div className={styles.rating}>
                  <h4 className="mb-0">{item?.first_name} {item?.last_name}</h4>
                  <div style={{display: "flex" , alignItems:"center"}}>
                    <CustomerRating rating={item.restaurant_rating} /> {" | "}
                    {item.restaurant_reviewed_at.split(" ")[0]}
                  </div>
                </div>
              </div>
              <p className="mb-0 mt-2">{item.restaurant_review} <span className={styles.seeMore} onClick={() => handleClick(item)}>See more...</span></p>
            </div>
          );
        })}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Container className={styles.modalContainer}>
        <div className="d-flex gap-2">
            <img src={placeholder} />
            <div className={styles.rating}>
              <h4 className="mb-0">{personalFeedback?.first_name} {personalFeedback?.last_name}</h4>
              <div style={{display: "flex" , alignItems:"center"}}>
                <CustomerRating rating={personalFeedback?.restaurant_rating} /> {" | "}
                {personalFeedback?.restaurant_reviewed_at.split(" ")[0]}
              </div>
            </div>
          </div>
          <p className="mb-0 mt-3">{personalFeedback?.restaurant_review} </p>
        </Container>
      </Modal>
    </>
  );
};

export default RestaurantFeedbackContent;
