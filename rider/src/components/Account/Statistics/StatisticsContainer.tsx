import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./StatisticsContainer.module.scss";
import Navigation from "../Navigation";

import RewardsContent from "./StatisticsContent";
import { useRestaurants } from "../../../hooks/useRestaurants";
import { useParams } from "react-router-dom";

interface ContainerProps {}

const StatisticsContainer: React.FC<ContainerProps> = ({}) => {
  // const [categories, setCategories] = useState<TCategory[] | null>(null);
  // const { getRestaurantCategories } = useRestaurants();

  // const { id } = useParams();

  // const loadRestaurantCategories = async () => {
  //   const params = { restaurant_id: id };
  //   const response = await getRestaurantCategories(params);
  //   console.log("getRestaurantCategories response", response);
  //   setCategories(response);
  // };

  // useEffect(() => {
  //   loadRestaurantCategories();
  // }, []);
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className="d-none d-lg-block">
          <div className={styles.navigationContainer}>
            <Navigation />
          </div>
        </Col>
        <Col lg={8} className={styles.bg}>
          <div className={styles.contentContainer}>
            <RewardsContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsContainer;
