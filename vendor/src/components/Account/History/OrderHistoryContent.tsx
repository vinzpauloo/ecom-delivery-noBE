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
import { Link, useParams } from "react-router-dom";

import styles from "./OrderHistoryContent.module.scss";

interface ContainerProps {}

const OrderHistoryContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          <Row>
            <Col>
              <h3>History</h3>
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
            <Col>
              <Button className={styles.btnCompleted}>Completed</Button>
            </Col>
            <Col>
              <Button className={styles.btnCancelled}>Cancelled</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default OrderHistoryContent;
