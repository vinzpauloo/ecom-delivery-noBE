import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { getRestaurantsByType } = useRestaurants();

  // Get the params from the URL
  const { type, id } = useParams();

  const loadRestaurants = async (page: number) => {
    setIsLoading(true);

    // Setup dynamic params
    const params = { [`${type}_id`]: id, page };

    const response = await getRestaurantsByType(params);
    // console.log("getRestaurantsByType response", response);

    setRestaurants((current) => [...current, ...response]);
    setLastPage(response.last_page);
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    loadRestaurants(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    loadRestaurants(1);
  }, []);

  return (
    <>
      <div
        className={`d-flex flex-wrap justify-content-start ${styles.restaurantGrid}`}
      >
        {restaurants?.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex-grow-1 ${styles.sliderContainer}`}
            >
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

      <div className={styles.button}>
        {restaurants?.length ? (
          currentPage < lastPage && (
            <div className="text-center">
              <Button
                variant="primary"
                className={styles.btnLoadMore}
                onClick={handleLoadMore}
              >
                {!isLoading ? "Load more" : "Loading ..."}
              </Button>
            </div>
          )
        ) : (
          <h5 className="text-center">No results found.</h5>
        )}

        {!isLoading && restaurants?.length
          ? currentPage === lastPage && (
              <h5 className="text-center">
                You have reached the last results.
              </h5>
            )
          : ""}
      </div>
    </>
  );
};

export default RestaurantsGrid;
