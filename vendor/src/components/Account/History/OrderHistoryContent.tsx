import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  Container,
} from "react-bootstrap";

import styles from "./OrderHistoryContent.module.scss";

interface ContainerProps {}

const OrderHistoryContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.tableContainer}>
      <Form>
        <Row>
          <Col></Col>
        </Row>
      </Form>
    </div>
  );
};

export default OrderHistoryContent;
