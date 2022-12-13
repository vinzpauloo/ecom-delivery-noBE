import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFlavors } from "../../../hooks/useFlavor";

import styles from "./FlavorsList.module.scss";

type TFlavor = {
  id: number;
  name: string;
  description: string;
  default_price: number;
  is_available: boolean;
};

interface ContainerProps {
  defaultFlavors: TFlavor[];
  currentFlavors: TFlavor[];
}

const FlavorsList: React.FC<ContainerProps> = ({
  defaultFlavors,
  currentFlavors,
}) => {
  const handlePriceOnChange = (item: any) => {};

  const handleToggle = (item: any) => {
    console.log("toggle availability", item);
  };

  return (
    <>
      <Row className={styles.flavorContainer}>
        <Col lg={7}>
          <div className={styles.flavorsList}>
            {defaultFlavors.map((item, index) => (
              <div key={index} className={`d-flex gap-2 ${styles.flavorItem}`}>
                <div className={styles.wLarge}>{item.name}</div>
                <div className={styles.wMedium}>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control type="text" value={item.default_price} />
                    <span>Php</span>
                    {/* <Form.Control type="text" /> */}
                  </div>
                </div>
                <div className={`text-end ${styles.wMedium}`}>
                  <Form.Check
                    className={styles.checkInput}
                    type="switch"
                    onChange={() => handleToggle(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FlavorsList;
