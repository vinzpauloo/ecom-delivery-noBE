import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import { useRestaurants } from "../../../hooks/useRestaurants";
import { useReviews } from "../../../hooks/useReviews";
import { getDate } from "../../../utils/formatDate";

import styles from "./RestaurantFeedbackContent.module.scss";
import placeholder from "../../../assets/images/placeholder.png";
import constants from "../../../utils/constants.json";
import RestaurantHeader from "./RestaurantHeader";
interface ContainerProps {}

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

  useEffect(() => {
    loadRestaurant();
    loadRestaurantReviews();
  }, []);
  console.log("@@@",reviews);
  return (
    <>
      <RestaurantHeader restaurantHeader={restaurant} />
      <Row>
        <div className={styles.filterButtonContainer}>

        </div>
      </Row>
      <div className={styles.list}>
        {reviews?.map((item, index) => {
          return (
            <div key={index} className={styles.listItem}>
              <div className="d-flex gap-2">
                <img src={placeholder} />
                <div className={styles.rating}>
                  <h4 className="mb-0">Customer Name</h4>
                  <div>
                    <CustomerRating rating={item.restaurant_rating} /> |
                    10|27|2022
                  </div>
                </div>
              </div>
              <p className="mb-0">{item.restaurant_review}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantFeedbackContent;
