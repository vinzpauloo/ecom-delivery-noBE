import React, { useState } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";

import styles from "./MenuContent.module.scss";
import SearchIcon from "../../../assets/images/search.png";

interface ContainerProps {}

const MenuContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          <Row>
            <Col>
              <h3>Restaurant Menu</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className={styles.btnAddMenu}> Add Menu </Button>
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
          <Row>
            <Col>
              <thead className={styles.theadHeader}>
                <tr>
                  <th className={styles.thHeader}>Name</th>
                  <th className={styles.thHeader}>Description</th>
                  <th className={styles.thHeader}>Price</th>
                  <th className={styles.thHeader}>Availability</th>
                  <th className={styles.thHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tdBody}>Title of the food</td>
                  <td className={styles.tdBody}>Food Description</td>
                  <td className={styles.tdBody}>100 php</td>
                  <td className={styles.tdBody}>
                    <div>
                      <Form.Check type="switch" />
                    </div>
                  </td>
                  <td className={styles.tdBody}>
                    <Button className={styles.btnEdit}>Edit</Button>{" "}
                    <Button className={styles.btnDelete}>Delete</Button>
                  </td>
                </tr>
              </tbody>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default MenuContent;
