import React from "react";
import { Button } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

import styles from "./StarButtons.module.scss";

interface ContainerProps {
  value: number;
  rating: number;
  setRating: any;
}

const StarButtons: React.FC<ContainerProps> = ({
  value,
  rating,
  setRating,
}) => {
  const handleOnClick = () => {
    setRating(value);
  };

  return (
    <div
      className={`${styles.container} ${value === rating ? styles.active : ``}`}
      onClick={handleOnClick}
    >
      {[...Array(value)].map((e, i) => (
        <StarFill color="#E6B325" size={18} key={i} />
      ))}
    </div>
  );
};

export default StarButtons;
