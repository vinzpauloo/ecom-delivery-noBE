import React from "react";

import CartSlider from "./CartSlider";
import styles from "./OrderSummary.module.scss";

// Sample static images
import cuisine01 from "../../assets/images/cuisine01.png";
import cuisine02 from "../../assets/images/cuisine02.png";
import cuisine03 from "../../assets/images/cuisine03.png";
import cuisine04 from "../../assets/images/cuisine04.png";
import cuisine05 from "../../assets/images/cuisine05.png";
import cuisine06 from "../../assets/images/cuisine06.png";

const cartSlides = [
  {
    image: cuisine02,
    price: 100,
    qty: 1,
  },
  {
    image: cuisine03,
    price: 400,
    qty: 3,
  },
  {
    image: cuisine01,
    price: 700,
    qty: 5,
  },
  {
    image: cuisine06,
    price: 250,
    qty: 9,
  },
  {
    image: cuisine04,
    price: 300,
    qty: 4,
  },
  {
    image: cuisine05,
    price: 900,
    qty: 7,
  },
];

interface ContainerProps {}

const OrderSummary: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <h4>Order Summary</h4>
      <CartSlider slides={cartSlides} />
    </div>
  );
};

export default OrderSummary;
