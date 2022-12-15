import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";

import styles from "./NavigationMobileContent.module.scss";

import variant01 from "../../../assets/images/variant01.png";
import variant02 from "../../../assets/images/variant02.png";
import variant03 from "../../../assets/images/variant03.png";
import variant04 from "../../../assets/images/variant04.png";
import variant05 from "../../../assets/images/variant05.png";
import variant06 from "../../../assets/images/variant06.png";
import variant07 from "../../../assets/images/variant07.png";
import variant08 from "../../../assets/images/variant08.png";
import variant09 from "../../../assets/images/variant09.png";
import variant10 from "../../../assets/images/variant10.png";

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

const NavigationMobileContent: React.FC<ContainerProps> = ({}) => {
  console.log(window.location.pathname);
  const [active, setActive] = useState(window.location.pathname);

  const { getForDeliveryOTW } = useGetOrderStatus();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

  useEffect(() => {
    loadOrderForDelivery("preparing, otw, pending, received");
  }, []);

  return (
    <div className="d-md-none fixed-bottom">
      <div className={styles.container}>
        <div style={{ position: "relative" }}>
          <Link to="/account/for-delivery">
            {"/account/for-delivery" === active ? (
              <>
                {forDelivery.length !== 0 ? (
                  <>
                    <img src={variant02} alt="" className="img-fluid" />
                    <span
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        left: "40px",
                        top: "2px",
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
                  </>
                ) : (
                  <>
                    <img src={variant02} alt="" className="img-fluid" />
                  </>
                )}
              </>
            ) : (
              <>
                {forDelivery.length !== 0 ? (
                  <>
                    <img src={variant01} alt="" className="img-fluid" />
                    <span
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        left: "40px",
                        top: "2px",
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
                  </>
                ) : (
                  <>
                    <img src={variant01} alt="" className="img-fluid" />
                  </>
                )}
              </>
            )}
          </Link>
        </div>
        <div>
          <Link to="/account/my-restaurant-menu">
            {"/account/my-restaurant-menu" === active ? (
              <img src={variant04} alt="" className="img-fluid" />
            ) : (
              <img src={variant03} alt="" className="img-fluid" />
            )}
          </Link>
        </div>
        <div>
          <Link to="/account/flavors">
            {"/account/flavors" === active ? (
              <img src={variant06} alt="" className="img-fluid" />
            ) : (
              <img src={variant05} alt="" className="img-fluid" />
            )}
          </Link>
        </div>
        <div>
          <Link to="/account/order-history">
            {"/account/order-history" === active ? (
              <img src={variant08} alt="" className="img-fluid" />
            ) : (
              <img src={variant07} alt="" className="img-fluid" />
            )}
          </Link>
        </div>
        <div>
          <Link to="/account">
            {"/account" === active ? (
              <img src={variant10} alt="" className="img-fluid" />
            ) : (
              <img src={variant09} alt="" className="img-fluid" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationMobileContent;
