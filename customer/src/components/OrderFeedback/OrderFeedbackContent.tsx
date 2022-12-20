import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useReviews } from "../../hooks/useReviews";
import { useOrders } from "../../hooks/useOrders";

import styles from "./OrderFeedbackContent.module.scss";
import constants from "../../utils/constants.json";
import FeedbackForm from "./FeedbackForm";
import ReviewOptions from "./ReviewOptions";
import StarRatings from "./StarRatings";
import RestaurantHeader from "./RestaurantHeader";

import Lottie from "lottie-react";
import saveSuccess from "../../assets/save-success.json";

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
  const [modalShowSuccess, setModalShowSuccess] = useState(false);
  const [options, setOptions] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [imageFiles, setImageFiles] = useState<any[]>([]);
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

    // Manually append each fields to a FormData
    const formData = new FormData();
    formData.append("restaurant_rating", `${rating}`);
    formData.append("restaurant_review", options + ". " + feedback);
    formData.append("_method", "put");

    // Loop through each images and append in a FormData array key
    imageFiles.forEach((image, index) => {
      console.log(`image ${index}`, image);
      formData.append("photos[]", image);
    });

    // console.log("Submitting restaurant review ...", formData);

    const response = await reviewRestaurant(id, formData);
    // console.log("reviewRestaurant response", response);

    if (!response.error) {
      setModalShowSuccess(true);
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
        setImageFiles={setImageFiles}
      />

      <Modal
        show={modalShowSuccess}
        onHide={() => {
          setModalShowSuccess(false);
          navigate(`/restaurants/${order?.restaurant_id}/feedback`);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center p-4`}>
            <Lottie animationData={saveSuccess} loop={true} />
            <p className="mt-4" style={{ fontWeight: "400" }}>
              Restaurant Feedback Successful!
            </p>

            <Link
              to={`/restaurants/${order?.restaurant_id}/feedback`}
              className={`d-inline-block mt-2`}
              style={{
                background: "#e6b325",
                border: "none",
                borderRadius: "5px",
                color: "black",
                fontSize: "16px",
                fontWeight: "300",
                width: "180px",
                padding: "6px",
                textDecoration: "none",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Go to Restaurant Feedbacks
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderFeedbackContent;
