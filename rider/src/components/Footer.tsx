import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import LogoFooter from "../assets/images/logo-footer.png";
import PinDark from "../assets/images/pin-dark.png";
import SocialFacebook from "../assets/images/social-facebook.png";
import SocialInstagram from "../assets/images/social-instagram.png";
import SocialMessenger from "../assets/images/social-messenger.png";
import SocialSkype from "../assets/images/social-skype.png";
import SocialTelegram from "../assets/images/social-telegram.png";
import SocialTwitter from "../assets/images/social-twitter.png";

import HelmetIcon from "../assets/images/helmet.png";
import RiderIcon from "../assets/images/delivery.png";
import HistoryIcon from "../assets/images/history.png";
import LockIcon from "../assets/images/lock.png";

import styles from "./Footer.module.scss";

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

const links = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Orders",
    link: "#",
  },
  {
    label: "Cart",
    link: "#",
  },
  {
    label: "Account",
    link: "#",
  },
  {
    label: "Logout",
    link: "#",
  },
];

const socialMedias = [
  {
    image: SocialTelegram,
    link: "#",
  },
  {
    image: SocialTwitter,
    link: "#",
  },
  {
    image: SocialFacebook,
    link: "#",
  },
  {
    image: SocialInstagram,
    link: "#",
  },
  {
    image: SocialSkype,
    link: "#",
  },
  {
    image: SocialMessenger,
    link: "#",
  },
];

interface ContainerProps {}

const Footer: React.FC<ContainerProps> = () => {
  const location = useLocation();

  const { getForDeliveryOTW } = useRiderOTW();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    //console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

  useEffect(() => {
    loadOrderForDelivery("preparing");
  }, []);
  return (
    // <footer className={`fixed-bottom ${styles.footer}`}>
    <>
      <footer className={`${styles.footer} fixed-bottom d-none d-lg-block`}>
        <Container fluid="xxl">
          <Row
            // lg={5}
            lg={4}
            xs={1}
            className={`justify-content-center align-items-center ${styles.container}`}
          >
            <Col className={`d-none d-md-block`}>
              <div className={styles.logo}>
                <Link to="/">
                  <img src={LogoFooter} alt="Food Monkey Logo" />
                </Link>
              </div>
            </Col>

            <Col className={`d-none d-md-block`}>
              <div className={styles.location}>
                <Link
                  to="#"
                  className="d-flex align-items-center justify-content-center text-decoration-none"
                >
                  <img src={PinDark} alt="Pin" />
                  <p>Panglao, Bohol, Philippines</p>
                </Link>
              </div>
            </Col>

            <Col className={`d-none d-md-block`}>
              <Row lg={6} xs="auto" className={styles.socials}>
                {socialMedias.map((item, index) => {
                  return (
                    <Col key={index}>
                      <Link to={item.link}>
                        <img src={item.image} alt="" />
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            </Col>

            <Col>
              <div className="text-center">
                <p>
                  All Rights Reserved <strong>2022</strong>
                </p>
                <p>Food Monkey</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* {location.pathname !== "/" && (
        <footer className="fixed-bottom d-lg-none">
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
      )} */}
    </>
  );
};

export default Footer;
