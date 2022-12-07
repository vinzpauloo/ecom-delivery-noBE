import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Details from "./Details";
import Filters from "./Filters";

import styles from "./RestaurantContainer.module.scss";
import { useRestaurants } from "../../hooks/useRestaurants";

interface ContainerProps {}

type TRestaurant = {
  id: number;
  name: string;
  address: string;
  description: string;
  contact_number: string;
  landline: string;
  photo: string;
};

type TMenu = {
  id: number;
  categories: TCategory[];
  name: string;
  description: string;
  price: number;
  photo: string;
  is_available: number;
};

type TCategory = {
  id: number;
  name: string;
  photo: string;
};

const RestaurantContainer: React.FC<ContainerProps> = ({}) => {
  const [restaurant, setRestaurant] = useState<TRestaurant | null>(null);
  const [menu, setMenu] = useState<TMenu[]>([]);
  const [menuOriginal, setMenuOriginal] = useState<TMenu[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [filter, setFilter] = useState(0);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const { getRestaurantsById, getRestaurantMenu, getRestaurantCategories } =
    useRestaurants();

  // Get the params from the URL
  const { id } = useParams();

  const loadRestaurant = async () => {
    const response = await getRestaurantsById(id);
    console.log("getRestaurantsById response", response);
    setRestaurant(response);
  };

  const loadRestaurantMenu = async () => {
    const params = { restaurant_id: id, with: "categories" };
    const response = await getRestaurantMenu(params);
    console.log("getRestaurantMenu response", response);
    setMenu(response);
    setMenuOriginal(response);
  };

  const loadRestaurantCategories = async () => {
    const params = { restaurant_id: id };
    const response = await getRestaurantCategories(params);
    console.log("getRestaurantCategories response", response);
    setCategories(response);
  };

  const handleFilter = (menu: TMenu[], category: number) => {
    console.log("handleFilter", category);
    console.log(menu);

    const filteredMenu = menu.filter((singleMenu) => {
      return singleMenu.categories[0].id === category;
    });

    console.log("new filteredMenu", filteredMenu);
    setMenu(filteredMenu);
  };

  useEffect(() => {
    loadRestaurant();
    loadRestaurantMenu();
    loadRestaurantCategories();
  }, []);

  useEffect(() => {
    if (isFilterEnabled) {
      if (filter) {
        // Filter menu items by category ID
        handleFilter(menuOriginal, filter);
      } else {
        // Set original menu without filter
        setMenu(menuOriginal);
      }
    } else {
      // Set original menu without filter
      setMenu(menuOriginal);
    }
  }, [filter, isFilterEnabled]);

  return (
    <Container fluid="xxl" className={`${styles.container}`}>
      <Row className={styles.innerContainer}>
        <Col lg={3} className="d-none d-lg-block">
          <Filters
            categories={categories}
            filter={filter}
            setFilter={setFilter}
            isFilterEnabled={isFilterEnabled}
            setIsFilterEnabled={setIsFilterEnabled}
          />
        </Col>
        <Col lg={9} className={`p-0 ${styles.bgBrown}`}>
          <Details
            restaurant={restaurant}
            menu={menu}
            categories={categories}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantContainer;
