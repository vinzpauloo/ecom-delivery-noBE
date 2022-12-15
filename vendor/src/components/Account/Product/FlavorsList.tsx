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
  price: number;
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
  const [price, setPrice] = useState(0);
  const [isCheck, setIsCheck] = useState(false);

  const isFlavorExist = (flavor_id: number) => {
    let isExist = false;

    // * Check if this flavor already exists in currentFlavors state
    for (let i = 0; i < currentFlavors.length; i++) {
      if (currentFlavors[i].flavor_id === flavor_id) {
        isExist = true;
        break;
      }
    }

    return isExist;
  };

  useEffect(() => {
    const flavor = currentFlavors.filter((val) => val.flavor_id === item.id);
    const value = flavor.length === 0 ? item.default_price : flavor[0].price;
    setIsCheck(!!flavor.length);
    setPrice(value);
    return () => {
      setPrice(0);
      setIsCheck(false);
    };
  }, [item, currentFlavors]);

  const handleOnPriceChange = (e: any, price: number) => {
    // * console.log("handleOnPriceChange", price);
    if (price >= 0) {
      const newCurrentFlavors = currentFlavors.map((obj) => {
        // 👇️ if same flavor id
        if (obj.flavor_id === item.id) {
          return { ...obj, price: parseInt(e.target.value) };
        } else {
          // 👇️ otherwise return object as is
          return obj;
        }
      });

      // * console.log("%%%!!!", newCurrentFlavors);
      setCurrentFlavors(newCurrentFlavors);
    } else {
      setPrice(0);
    }
  };

  const handleToggle = (item: TFlavor) => {
    console.log("toggle availability", item);
    setIsCheck((prev) => !prev);
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
      <div
        className={styles.wLarge}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {item.name}
      </div>
      <div className={styles.wMedium}>
        <div className="d-flex align-items-center gap-2">
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => handleOnPriceChange(e, parseInt(e.target.value))}
            disabled={!isFlavorExist(item.id)}
          />
          <span>Php</span>
        </div>
      </div>
      <div
        className={`text-end ${styles.wMedium}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Form.Check
          checked={isCheck}
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
  // let ids: any = [];
  // let mergeArray: any = [];
  // for (let i of defaultFlavors) {
  //   for (let j of currentFlavors) {
  //     if (!ids.includes(j.flavor_id)) {
  //       mergeArray.push(j);
  //       ids.push(j.flavor_id);
  //     } else if (!ids.includes(i.id)) {
  //       mergeArray.push(i);
  //       ids.push(i.id);
  //     }
  //   }
  // }
  // console.log("@@@", mergeArray);

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
