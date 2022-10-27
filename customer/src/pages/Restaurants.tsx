import React from "react";
import RestaurantsContainer from "../components/Restaurants/RestaurantsContainer";

type Props = {};

const Restaurants = (props: Props) => {
  return (
    <div className="page">
      <RestaurantsContainer />
    </div>
  );
};

export default Restaurants;
