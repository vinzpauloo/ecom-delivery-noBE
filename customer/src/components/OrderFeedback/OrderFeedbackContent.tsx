import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {} from "react-bootstrap";
import { useReviews } from "../../hooks/useReviews";
import { useOrders } from "../../hooks/useOrders";

import styles from "./OrderFeedbackContent.module.scss";
import constants from "../../utils/constants.json";
import FeedbackForm from "./FeedbackForm";
import ReviewOptions from "./ReviewOptions";
import StarRatings from "./StarRatings";
import RestaurantHeader from "./RestaurantHeader";

interface ContainerProps {}

type TOrder = {
  id?: number;
  created_at?: string;
  customer_id?: number;
  customer_name?: string;
  customer_mobile?: string;
  order_address?: string;
  order_status?: string;
  restaurant_id?: number;
  restaurant_address?: string;
  total_amount?: number;
  rider_name?: string;
  rider_photo?: string;
  rider_vehicle_brand?: string;
  rider_vehicle_model?: string;
  plate_number?: string;
};

const OrderFeedbackContent: React.FC<ContainerProps> = ({}) => {
  const [options, setOptions] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [order, setOrder] = useState<TOrder>();
  const [restaurantHeader, setRestaurantHeader] = useState<any>();
  const navigate = useNavigate();
  const { reviewRestaurant } = useReviews();
  const { getOrdersById } = useOrders();

  // Get the params from the URL
  const { id } = useParams();

  const loadOrder = async () => {
    // Get user order
    const response = await getOrdersById(id);
    console.log("getOrdersById response", response);

    setOrder(response);

    const thisRestaurant = {
      restaurant_id: response.restaurant_id,
      restaurant_name: response.restaurant_name,
      restaurant_description: response.restaurant_description,
      restaurant_address: response.restaurant_address,
      restaurant_photo: response.restaurant_photo,
      restaurant_average_rating: response.restaurant_average_rating,
    };
    setRestaurantHeader(thisRestaurant);
  };

  const handleOnClick = async () => {
    if (!options) {
      alert(constants.form.error.reviewOption);
      return;
    }

    if (!rating) {
      alert(constants.form.error.reviewRating);
      return;
    }

    if (!feedback) {
      alert(constants.form.error.reviewFeedback);
      return;
    }

    const data = {
      restaurant_rating: rating,
      restaurant_review: options + ". " + feedback,
    };

    console.log("Submitting restaurant review ...");
    console.log(id, data);

    const response = await reviewRestaurant(id, data);
    console.log("reviewRider response", response);

    if (!response.error) {
      alert(constants.form.success.reviewRestaurant);

      //  Redirect to restaurant feedback list page
      navigate(`/restaurants/${order?.restaurant_id}/feedback`);
    } else {
      alert(response.error);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <>
      <RestaurantHeader restaurantHeader={restaurantHeader} />
      <ReviewOptions options={options} setOptions={setOptions} />
      <StarRatings rating={rating} setRating={setRating} />
      <FeedbackForm
        feedback={feedback}
        setFeedback={setFeedback}
        handleOnClick={handleOnClick}
      />
    </>
  );
};

export default OrderFeedbackContent;
