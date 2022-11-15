import React from "react";
import { Button } from "react-bootstrap";

import styles from "./ConfirmOrder.module.scss";

interface ContainerProps {}

const ConfirmOrder: React.FC<ContainerProps> = ({}) => {
  const handleOnClick = () => {
    console.log("Confirming order ...");
  };

  return (
    <div className={styles.container}>
      <Button
        variant="primary"
        type="submit"
        className="mt-4"
        onClick={handleOnClick}
      >
        Confirm Order
      </Button>
    </div>
  );
};

export default ConfirmOrder;
