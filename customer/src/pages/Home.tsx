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

// Sample categories
import category01 from "../assets/images/category01.jpg";
import category02 from "../assets/images/category02.jpg";
import category03 from "../assets/images/category03.jpg";
import category04 from "../assets/images/category04.jpg";
import category05 from "../assets/images/category05.jpg";
import category06 from "../assets/images/category06.jpg";
import category07 from "../assets/images/category07.jpg";

// Sample cuisines
import cuisine01 from "../assets/images/cuisine01.png";
import cuisine02 from "../assets/images/cuisine02.png";
import cuisine03 from "../assets/images/cuisine03.png";
import cuisine04 from "../assets/images/cuisine04.png";
import cuisine05 from "../assets/images/cuisine05.png";
import cuisine06 from "../assets/images/cuisine06.png";
import cuisine07 from "../assets/images/cuisine07.png";

// Sample restaurants
import restau01 from "../assets/images/restau01.png";
import restau02 from "../assets/images/restau02.png";
import restau03 from "../assets/images/restau03.png";
import restau04 from "../assets/images/restau04.png";
import restau05 from "../assets/images/restau05.png";
import restau06 from "../assets/images/restau06.png";
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

// const categories = [
//   {
//     image: category01,
//     title: "Healthy",
//   },
//   {
//     image: category02,
//     title: "Burgers",
//   },
//   {
//     image: category03,
//     title: "Shawarma",
//   },
//   {
//     image: category04,
//     title: "Pizzas",
//   },
//   {
//     image: category05,
//     title: "Biryani",
//   },
//   {
//     image: category06,
//     title: "Chicken Meals",
//   },
//   {
//     image: category07,
//     title: "Pork Meals",
//   },
// ];

// const cuisines = [
//   {
//     image: cuisine01,
//     title: "Chinese",
//   },
//   {
//     image: cuisine02,
//     title: "Indian",
//   },
//   {
//     image: cuisine03,
//     title: "Japanese",
//   },
//   {
//     image: cuisine04,
//     title: "Thai",
//   },
//   {
//     image: cuisine05,
//     title: "Italian",
//   },
//   {
//     image: cuisine06,
//     title: "French",
//   },
//   {
//     image: cuisine07,
//     title: "Turkish",
//   },
// ];

const restaurantRowData = [
  {
    image: restau01,
    title: "Chan's Chinese Restaurant",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau02,
    title: "Jollibee",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau03,
    title: "Yellow Cab",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau04,
    title: "Tokyo Tokyo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau05,
    title: "Italianni's Restaurant",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau06,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
];

type Slide = {
  id: number;
  name: string;
  photo: string;
};

type Restaurants = {
  photo: string;
  name: string;
  address: string;
  social_link: string;
};

type Props = {};

const Home = (props: Props) => {
  const [categories, setCategories] = useState<Slide[]>([]);
  const [cuisines, setCuisines] = useState<Slide[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
  const { getCategories } = useCategories();
  const { getCuisines } = useCuisines();
  const { getRestaurants } = useRestaurants();

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

  const loadShops = async () => {
    const response = await getRestaurants();
    console.log("getShops response", response);
    setRestaurants(response.data);
  };

  useEffect(() => {
    // Load initial data
    loadCategories();
    loadCuisines();
    loadShops();
  }, []);

  return (
    <div className="page">
      <Lunbo slides={lunbos} />

      <CategoryRow title="Category" slides={categories} />
      <CategoryRow title="Cuisine" slides={cuisines} />
      <RestaurantRow slides={restaurants} />
    </div>
  );
};

export default Home;
