import React from "react";
import { Button } from "react-bootstrap";

import styles from "./ConfirmOrder.module.scss";

interface ContainerProps {}

const ConfirmOrder: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <Button
        variant="primary"
        type="submit"
        className="mt-4"
        form="delivery-details"
      >
        Confirm Order
      </Button>
    </div>
  );
};

export default ConfirmOrder;
