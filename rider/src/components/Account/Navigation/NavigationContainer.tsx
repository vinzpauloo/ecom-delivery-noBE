import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./NavigationContainer.module.scss";
import Navigation from "./Navigation";
import NavigationMobileContent from "./NavigationMobileContent";

interface ContainerProps {}

const NavigationContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Navigation />
      <NavigationMobileContent />
    </Container>
  );
};

export default NavigationContainer;
