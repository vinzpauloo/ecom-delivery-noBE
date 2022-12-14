import React, { useState, useEffect } from "react";
import "./FooterMobile.scss";
import { Link } from "react-router-dom";

import HelmetIcon from "../assets/images/helmet.png";
import RiderIcon from "../assets/images/delivery.png";
import HistoryIcon from "../assets/images/history.png";
import LockIcon from "../assets/images/lock.png";

import { useRiderOTW } from "../hooks/useRiderOTW";

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
  restaurant_photo: string;
  restaurant_address: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: string;
  total_amount: string;
  delivered_at: string;
};

const FooterMobile = () => {
  const { getForDeliveryOTW } = useRiderOTW();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

  useEffect(() => {
    loadOrderForDelivery("preparing");
  }, []);

  return (
    <footer className="fixed-bottom">
      <a href="/account">
        <img src={HelmetIcon} alt="" />
      </a>
      <a href="/account/for-delivery">
        {forDelivery.length !== 0 ? (
          <div style={{ position: "relative" }}>
            <img src={RiderIcon} alt="" />
            <span
              style={{
                display: "inline-block",
                position: "absolute",
                left: "75px",
                top: "5px",
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
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <img src={RiderIcon} alt="" />
          </div>
        )}
      </a>
      <a href="/account/order-history">
        <img src={HistoryIcon} alt="" />
      </a>
      <a href="/account/reset-password">
        <img src={LockIcon} alt="" />
      </a>
    </footer>
  );
};

export default FooterMobile;
