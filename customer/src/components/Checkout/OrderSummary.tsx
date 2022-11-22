import React from "react";

import CartSlider from "./CartSlider";
import styles from "./OrderSummary.module.scss";

type TCart = {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
};

interface ContainerProps {
  cart: TCart[];
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
}

const OrderSummary: React.FC<ContainerProps> = ({ cart, setCart }) => {
  return (
    <div className={styles.container}>
      <h4>Order Summary</h4>
      <CartSlider cart={cart} setCart={setCart} />
    </div>
  );
};

export default OrderSummary;
