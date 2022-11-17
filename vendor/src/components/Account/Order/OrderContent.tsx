import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
} from "react-bootstrap";

import styles from "./OrderContent.module.scss";

interface ContainerProps {}

const OrderContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          <Row>
            <Col>
              <h3>For Delivery (Current Orders)</h3>
            </Col>
          </Row>
          <Row className="d-none d-lg-block">
            <Col>
              <Form.Control
                className={styles.searchBar}
                type="text"
                placeholder="Search food and description"
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default OrderContent;
