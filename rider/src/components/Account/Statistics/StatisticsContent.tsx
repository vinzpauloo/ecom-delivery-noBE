import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  Form,
  Collapse,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./StatisticsContent.module.scss";

import Chart from "./Chart";

interface ContainerProps {}

const StatisticsContent: React.FC<ContainerProps> = ({}) => {
  const navigate = useNavigate();

  const navigateToDelivery = () => {
    navigate("/account/for-delivery");
  };

  const handleClickBack = () => {
    navigate(`/account/rewards`);
  };

  return (
    <Container className={styles.container}>
      <Row>
        <Col xs={9} md={8}>
          <p>My Statistics</p>
        </Col>
        <Col xs={3} md={2}>
          <Button className={styles.statsBtn} onClick={handleClickBack}>
            Go Back
          </Button>
        </Col>
      </Row>

      <Row>
        <Chart />
        <Chart />
        <Chart />
      </Row>
    </Container>
  );
};

export default StatisticsContent;
