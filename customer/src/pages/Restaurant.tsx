import React from "react";
import RestaurantContainer from "../components/RestaurantOld/RestaurantContainer";
import RestaurantContainer2 from "../components/Restaurant/RestaurantContainer";

type Props = {};

const Restaurant = (props: Props) => {
  return (
    <div className="page">
      {/* <RestaurantContainer /> */}
      <RestaurantContainer2 />
    </div>
  );
};

export default Restaurant;
