import React, { useEffect, useState } from "react";
import Lunbo from "../components/Home/Lunbo";
import CategoryRow from "../components/Home/CategoryRow";
import RestaurantRow from "../components/Home/RestaurantRow";

// Lunbo slider images
import slider1 from "../assets/images/slider1.jpg";
import slider2 from "../assets/images/slider2.jpg";
import slider3 from "../assets/images/slider3.jpg";
import slider4 from "../assets/images/slider4.jpg";
import slider5 from "../assets/images/slider5.png";

import { useCategories } from "../hooks/useCategories";
import { useCuisines } from "../hooks/useCuisines";
import { useRestaurants } from "../hooks/useRestaurants";

const lunbos = [
  {
    image: slider1,
    title: "Welcome to FOOD MONKEY",
    description: "Exclusive food delivery app for Bohol Residents only",
    positionClass: "topLeft",
  },
  {
    image: slider2,
    title: "Freedom to explore",
    description: "Bohol has its own taste of food",
    positionClass: "bottomLeft",
  },
  {
    image: slider3,
    title: "Enjoy your vacation",
    description: "While we deliver your food",
    positionClass: "topRight",
  },
  {
    image: slider4,
    title: "No need to worry",
    description: "Food monkey is here",
    positionClass: "bottomRight",
  },
  {
    image: slider5,
    title: "We got you!",
    description: "Deliveries at your doorsteps.",
    positionClass: "topLeft",
  },
];

type TypeSlide = {
  id: number;
  name: string;
  photo: string;
};

type RestaurantsSlide = {
  photo: string;
  name: string;
  address: string;
  social_link: string;
};

type Props = {};

const Home = (props: Props) => {
  const [categories, setCategories] = useState<TypeSlide[]>([]);
  const [cuisines, setCuisines] = useState<TypeSlide[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantsSlide[]>([]);
  const { getCategories } = useCategories();
  const { getCuisines } = useCuisines();
  const { getRestaurants, getRestaurantsByType } = useRestaurants();

  const loadCategories = async () => {
    const response = await getCategories();
    console.log("getCategories response", response);
    setCategories(response);
  };

  const loadCuisines = async () => {
    const response = await getCuisines();
    console.log("getCuisines response", response);
    setCuisines(response);
  };

  const loadRestaurants = async () => {
    const response = await getRestaurants();
    console.log("getRestaurants response", response);
    setRestaurants(response.data);
  };

  useEffect(() => {
    // Load initial data
    loadCategories();
    loadCuisines();
    loadRestaurants();
  }, []);

  return (
    <div className="page">
      <Lunbo slides={lunbos} />
      <CategoryRow title="Category" type="category" slides={categories} />
      <CategoryRow title="Cuisine" type="cuisine" slides={cuisines} />
      <RestaurantRow slides={restaurants} />
    </div>
  );
};

export default Home;
