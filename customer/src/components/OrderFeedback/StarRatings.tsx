import React, { useState } from "react";

import styles from "./StarRatings.module.scss";
import StarButtons from "./StarButtons";

interface ContainerProps {
  rating: number;
  setRating: any;
}

const StarRatings: React.FC<ContainerProps> = ({ rating, setRating }) => {
  return (
    <div className={styles.container}>
      <p>Please select Star Rating</p>
      <div
        className={`d-flex gap-2 justify-content-center mt-3 ${styles.btnRating}`}
      >
        <StarButtons value={5} rating={rating} setRating={setRating} />
        <StarButtons value={4} rating={rating} setRating={setRating} />
        <StarButtons value={3} rating={rating} setRating={setRating} />
        <StarButtons value={2} rating={rating} setRating={setRating} />
        <StarButtons value={1} rating={rating} setRating={setRating} />
      </div>
    </div>
  );
};

export default StarRatings;
