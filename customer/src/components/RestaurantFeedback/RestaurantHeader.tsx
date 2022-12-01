import React from "react";
import { Row, Col } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

import styles from "./RestaurantHeader.module.scss";

import restau01 from "../../assets/images/restau01.png";

interface ContainerProps {}

const RestaurantHeader: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <Row>
        <Col lg={4} md={5}>
          <div
            className={`d-flex gap-3 align-items-center ${styles.restaurantProfile}`}
          >
            <img src={restau01} className="img-fluid" alt="" />
            <div>
              <h2>Chan’s Chinese Cuisine</h2>
              <p className="mb-2">Panglao, Bohol</p>
              <div className={`d-flex gap-1 ${styles.rating}`}>
                <StarFill color="#E6B325" size={18} />
                <StarFill color="#E6B325" size={18} />
                <StarFill color="#E6B325" size={18} />
                <StarFill color="#E6B325" size={18} />
                <StarFill color="#D9D9D9" size={18} />
              </div>
            </div>
          </div>
        </Col>

        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 0 }}>
          <div className={styles.restaurantContent}>
            <h4>What is the Chan’s Chinese cuisine?</h4>
            <p>
              Asian Fusion uses traditional Asian-style ingredients, dishes and
              techniques to create innovative and flavorful new fusions. It is a
              cuisine style that typically combines Asian foods with the likes
              of traditional Mexican.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantHeader;
