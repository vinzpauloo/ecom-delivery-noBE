import React from "react";
import { Container } from "react-bootstrap";

import styles from "./RestaurantFeedbackContainer.module.scss";
import RestaurantFeedbackContent from "./RestaurantFeedbackContent";
import RestaurantHeader from "./RestaurantHeader";

interface ContainerProps {}

const RestaurantFeedbackContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl" className={styles.container}>
      <RestaurantHeader />
      <RestaurantFeedbackContent />
    </Container>
  );
};

export default RestaurantFeedbackContainer;
