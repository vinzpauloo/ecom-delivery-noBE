import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFlavors } from "../../../hooks/useFlavor";

import styles from "./FlavorsList.module.scss";

type TFlavor = {
  id: number;
  name: string;
  description: string;
  default_price: number;
};

type TCurrentFlavor = {
  flavor_id: number;
  flavor_price: number;
};

interface ContainerProps {
  defaultFlavors: TFlavor[];
  currentFlavors: TCurrentFlavor[];
  setCurrentFlavors: any;
}

const FlavorItem = ({
  item,
  currentFlavors,
  setCurrentFlavors,
}: {
  item: TFlavor;
  currentFlavors: TCurrentFlavor[];
  setCurrentFlavors: any;
}) => {
  const [price, setPrice] = useState(item.default_price);

  const isFlavorExist = (flavor_id: number) => {
    let isExist = false;

    // Check if this flavor already exists in currentFlavors state
    for (let i = 0; i < currentFlavors.length; i++) {
      if (currentFlavors[i].flavor_id === flavor_id) {
        isExist = true;
        break;
      }
    }

    return isExist;
  };

  const handleOnPriceChange = (price: number) => {
    console.log("handleOnPriceChange", price);
    setPrice(price);

    const newCurrentFlavors = currentFlavors.map((obj) => {
      // 👇️ if same flavor id
      if (obj.flavor_id === item.id) {
        return { ...obj, flavor_price: price };
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    setCurrentFlavors(newCurrentFlavors);
  };

  const handleToggle = (item: TFlavor) => {
    console.log("toggle availability", item);

    const thisFlavor = {
      flavor_id: item.id,
      flavor_price: price,
    };

    if (isFlavorExist(item.id)) {
      console.log("Removing existing flavor ...");
      setCurrentFlavors((current) => {
        return current.filter((obj) => {
          return obj.flavor_id !== thisFlavor.flavor_id;
        });
      });
    } else {
      console.log("Pushing new flavor ...");
      setCurrentFlavors((current) => {
        return [...current, thisFlavor];
      });
    }
  };

  return (
    <div className={`d-flex gap-2 ${styles.flavorItem}`}>
      <div className={styles.wLarge}>{item.name}</div>
      <div className={styles.wMedium}>
        <div className="d-flex align-items-center gap-2">
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => handleOnPriceChange(parseInt(e.target.value))}
            disabled={!isFlavorExist(item.id)}
          />
          <span>Php</span>
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
  );
};

const FlavorsList: React.FC<ContainerProps> = ({
  defaultFlavors,
  currentFlavors,
  setCurrentFlavors,
}) => {
  return (
    <>
      <Row className={styles.flavorContainer}>
        <Col>
          <div className={styles.flavorsList}>
            {defaultFlavors.map((item, index) => (
              <FlavorItem
                key={index}
                item={item}
                currentFlavors={currentFlavors}
                setCurrentFlavors={setCurrentFlavors}
              />
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FlavorsList;
