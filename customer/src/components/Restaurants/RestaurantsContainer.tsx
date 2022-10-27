import React from "react";
import { Container } from "react-bootstrap";

import styles from "./RestaurantsContainer.module.scss";
import RestaurantsGrid from "./RestaurantsGrid";

interface ContainerProps {}

const RestaurantsContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <div className="pt-5 pb-4">
        <RestaurantsGrid />
      </div>
    </Container>
  );
};

export default RestaurantsContainer;
