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
  const [sort, setSort] = useState(0);
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
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
    const params = { restaurant_id: id, with: "categories,productFlavors" };
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
    const filteredMenu = menu.filter((singleMenu) => {
      return singleMenu.categories[0]?.id === category;
    });

    setMenu(filteredMenu);
  };

  const handleSort = (menu: TMenu[], sortId: number) => {
    let sortedMenu = [...menu];

    if (sortId === 1) {
      // Ascending
      sortedMenu = sortedMenu.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      // Descending
      sortedMenu = sortedMenu.sort((a, b) => {
        return b.price - a.price;
      });
    }

    setMenu(sortedMenu);
  };

  const handleFilterSort = (
    menu: TMenu[],
    category: number,
    sortId: number
  ) => {
    let menuCopy = [...menu];
    menuCopy = menuCopy.filter((singleMenu) => {
      return singleMenu.categories[0].id === category;
    });

    if (sortId === 1) {
      // Ascending
      menuCopy = menuCopy.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      // Descending
      menuCopy = menuCopy.sort((a, b) => {
        return b.price - a.price;
      });
    }

    setMenu(menuCopy);
  };

  useEffect(() => {
    loadRestaurant();
    loadRestaurantMenu();
    loadRestaurantCategories();
  }, []);

  useEffect(() => {
    if (isFilterEnabled) {
      if (filter && !sort) {
        // Filter only enabled
        handleFilter(menuOriginal, filter);
      } else if (sort && !filter) {
        // Sort only enabled
        handleSort(menuOriginal, sort);
      } else if (filter && sort) {
        // Filter + sort enabled
        handleFilterSort(menuOriginal, filter, sort);
      } else {
        setMenu(menuOriginal);
      }
    } else {
      // Set original menu without filter
      setMenu(menuOriginal);
    }
  }, [filter, sort, isFilterEnabled]);

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
            sort={sort}
            setSort={setSort}
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
