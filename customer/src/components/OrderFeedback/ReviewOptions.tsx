import React from "react";
import { Button } from "react-bootstrap";

import styles from "./ReviewOptions.module.scss";

interface ContainerProps {}

const ReviewOptions: React.FC<ContainerProps> = ({}) => {
  const options = [
    "Good Service",
    "Fast Moving",
    "Recommended",
    "One of a kind",
    "Epic Packaging",
    "Five Stars!",
    "Better food",
    "Very nice!",
  ];

  return (
    <div className={styles.container}>
      <p>Please select one for review</p>
      <div className={`d-flex gap-2 justify-content-center ${styles.buttons}`}>
        {options.map((e, i) => {
          return <Button key={i}>{e}</Button>;
        })}
      </div>
    </div>
  );
};

export default ReviewOptions;
