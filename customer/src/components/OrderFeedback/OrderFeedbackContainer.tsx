import React, { useState } from "react";
import { Container } from "react-bootstrap";
import FeedbackForm from "./FeedbackForm";

import styles from "./OrderFeedbackContainer.module.scss";
import RestaurantHeader from "./RestaurantHeader";
import ReviewOptions from "./ReviewOptions";
import StarRatings from "./StarRatings";

interface ContainerProps {}

const OrderFeedbackContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl" className={styles.container}>
      <RestaurantHeader />
      <ReviewOptions />
      <StarRatings />
      <FeedbackForm />
    </Container>
  );
};

export default OrderFeedbackContainer;
