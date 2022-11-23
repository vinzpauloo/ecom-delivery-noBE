import React from "react";
import { Container } from "react-bootstrap";

import styles from "./SearchContainer.module.scss";
import RestaurantsGrid from "./RestaurantsGrid";

interface ContainerProps {}

const SearchContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl" className={styles.container}>
      <RestaurantsGrid />
    </Container>
  );
};

export default SearchContainer;
