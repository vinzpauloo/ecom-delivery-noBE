import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import styles from "./Navigation.module.scss";

import { useGetOrderStatus } from "../../../hooks/useGetOrderStatus";

type ForDeliveryItem = {
  created_at: string;
  customer_id: string;
  customer_mobile: string;
  customer_name: string;
  order_address: string;
  order_email: string;
  order_mobile: string;
  order_status: string;
  otw_at: string;
  payment_type: string;
  plate_number: string;
  restaurant_name: string;
  restaurant_id: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: string;
  restaurant_address: string;
  total_amount: number;
};
interface ContainerProps {}

const Navigation: React.FC<ContainerProps> = ({}) => {

  const { getForDeliveryOTW } = useGetOrderStatus();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    // *console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

  useEffect(() => {
    loadOrderForDelivery("preparing, otw, pending, received");
  }, []);

  return (
    <Container className={`d-none d-md-block ${styles.navigation}`}>
      <ul>
        <li style={{position: "relative"}}>
          {/* <Link to="/account/reset-password">Reset Password</Link> */}
          <Link to="/account/for-delivery">For Delivery</Link>
          <span
              style={{
                display: "inline-block",
                position: "absolute",
                right: "23px",
                top: "23px",
                background: "red",
                borderRadius: "20px",
                border: "1px solid white",
                width: "28px",
                height: "27px",
                textAlign: "center",
                color: "white",
                fontWeight: "600",
              }}
          >
              {forDelivery.length}
            </span>
        </li>
        <li>
          <Link to="/account/my-restaurant-menu">Menu</Link>
        </li>
        <li>
          <Link to="/account/flavors">Flavors</Link>
        </li>
        <li>
          <Link to="/account/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
      </ul>
    </Container>
  );
};

export default Navigation;
