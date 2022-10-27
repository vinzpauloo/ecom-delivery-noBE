import React from "react";

import styles from "./RestaurantContainer.module.scss";
import Menu from "./Menu";

interface ContainerProps {}

const RestaurantContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div>
      <Menu />
    </div>
  );
};

export default RestaurantContainer;
