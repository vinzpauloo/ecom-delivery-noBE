import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./NavigationContainer.module.scss";
import Navigation from "./Navigation";

interface ContainerProps {}

const NavigationContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl" className="d-none d-lg-block">
      <Navigation />
    </Container>
  );
};

export default NavigationContainer;
