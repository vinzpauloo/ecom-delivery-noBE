import React, { useState, useEffect } from "react";

import CartSlider from "./CartSlider";
import styles from "./OrderSummary.module.scss";

type TCart = {
  id: number;
  name: string;
  price: number;
  photo: string;
  qty: number;
};

interface ContainerProps {
  // slides: any;
}

const OrderSummary: React.FC<ContainerProps> = () => {
  const [cart, setCart] = useState<TCart[]>([]);

  useEffect(() => {
    let checkoutDetails = localStorage.getItem("checkout") || "";
    let checkoutDetailsObj = JSON.parse(checkoutDetails);
    setCart(checkoutDetailsObj.products);
  }, []);

  return (
    <div className={styles.container}>
      <h4>Order Summary</h4>
      <CartSlider slides={cart} />
    </div>
  );
};

export default OrderSummary;
