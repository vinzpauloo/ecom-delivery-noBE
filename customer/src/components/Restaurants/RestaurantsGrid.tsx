import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./RestaurantsGrid.module.scss";
import { useRestaurants } from "../../hooks/useRestaurants";

type RestaurantsItem = {
  id: number;
  name: string;
  address: string;
  photo: string;
  social_link: string;
};

interface ContainerProps {}

const RestaurantsGrid: React.FC<ContainerProps> = ({}) => {
  const [restaurants, setRestaurants] = useState<RestaurantsItem[]>([]);
  const { getRestaurantsByType } = useRestaurants();

  // Get the params from the URL
  const { type, id } = useParams();

  const loadRestaurants = async () => {
    // Setup dynamic params
    const params = { [`${type}_id`]: id };

    const response = await getRestaurantsByType(params);
    console.log("getRestaurantsByType response", response);
    setRestaurants(response.data);
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div
      className={`d-flex flex-wrap justify-content-start ${styles.restaurantGrid}`}
    >
      {restaurants.map((item, index) => {
        return (
          <div key={index} className={`flex-grow-1 ${styles.sliderContainer}`}>
            <div className={styles.slideItem}>
              <div className={styles.slideImageContainer}>
                <img
                  src={
                    item.photo == "no-images.jpg"
                      ? "https://via.placeholder.com/500"
                      : // : process.env.REACT_APP_BASE_URL + item.photo
                        item.photo
                  }
                  alt=""
                />
              </div>
              <div className={styles.slideContentContainer}>
                <p className={styles.slideTitle}>{item.name}</p>
                <p className={styles.slideDescription}>{item.address}</p>
                <Link
                  to={`/restaurants/${item.id}`}
                  className={styles.slideLink}
                >
                  Visit
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantsGrid;
