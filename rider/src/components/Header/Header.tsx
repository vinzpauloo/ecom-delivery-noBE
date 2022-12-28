import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { List, Person } from "react-bootstrap-icons";
import { useLogout } from "../../hooks/useLogout";
import { useIsAuthenticated } from "react-auth-kit";

import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import OffcanvasMenu from "./OffcanvasMenu";
import styles from "./Header.module.scss";

import Alert from "react-bootstrap/Alert";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import PinLight from "../../assets/images/pin-light.png";

import Pusher from "pusher-js";
import { useUser } from "../../hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import constants from "../../utils/constants.json";

interface ContainerProps {
  setNotification: (props: boolean) => void;
}

const Header: React.FC<ContainerProps> = ({ setNotification }) => {
  const { logout } = useLogout();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    logout();
  };

  //Get user details
  const { getUser } = useUser();

  // Get user request
  const handleGetUser = async () => {
    console.log("Requesting getUser ...");

    const response = await getUser();
    // console.log("handleGetUser response", response);
    if (isAuthenticated() && response.error) {
      logout();
    }

    //PusherJS start
    const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY || "";

    const pusher = new Pusher(PUSHER_KEY, {
      cluster: "ap1",
    });

    // const pusher = new Pusher("301049041d7830d91c0e", {
    //   cluster: "ap1",
    // });
    // console.log("PUSHER", pusher);
    // Pusher.logToConsole = true;

    // const restaurantId = response.restaurant[0].id;
    // console.log(restaurantId);

    const channel = pusher.subscribe("Order-Preparing-Channel");

    channel.bind(
      "Order-Updated-Event",
      () => {
        // alert(`You have received a new order for delivery.`);
        setNotification(true);
        const timer = setTimeout(() => {
          setNotification(false);
          window.location.reload();
        }, 3000);
        return () => clearTimeout(timer);
      },
      []
    );

    // channel.bind("Order-Updated-Event", () => {
    //   alert(`Order status updated`);
    // });
    //PusherJS end
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  // <Alert variant="success">
  //   <Alert.Heading>Incoming Order!!!</Alert.Heading>
  //   <p>Please check your "For Delivery" page, and accept the order.</p>
  //   <hr />
  //   <p className="mb-0">Thank you for using FoodMonkey.</p>
  // </Alert>

  return (
    <header
      className={`d-flex align-items-center fixed-top bg-white ${styles.header}`}
    >
      <Container fluid="xxl">
        <Row className="justify-content-center align-items-center">
          {/* Brand */}
          <Col lg={6} xs={4}>
            <div className="d-flex align-items-center">
              <div className={styles.logo}>
                <Link to="/">
                  <img
                    src={LogoHeader}
                    alt="Food Monkey Logo"
                    className={styles.logoMain}
                  />
                  <img
                    src={LogoHeaderHover}
                    alt="Food Monkey Logo"
                    className={styles.logoHover}
                  />
                </Link>
              </div>

              <div className={`d-none d-lg-block ${styles.location}`}>
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center text-decoration-none"
                >
                  <img src={PinLight} alt="Pin" />
                  <p className="mb-0">Panglao, Bohol, Philippines</p>
                </a>
              </div>
            </div>
          </Col>

          {/* Search + Links for desktop */}
          <Col className="d-none d-lg-block">
            <div className={`lh-1 text-end ${styles.links}`}>
              {isAuthenticated() ? (
                <>
                  <Link to="/account">Account</Link>
                  <Link to="#" onClick={handleLogout}>
                    Log out
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">Log in</Link>
                </>
              )}
            </div>
          </Col>

          {/* Search + Burger menu for mobile */}
          <Col
            md={{ span: 6, offset: 2 }}
            xs={{ span: 7, offset: 1 }}
            className="d-lg-none"
          >
            <div className="d-flex justify-content-end align-items-center">
              <OffcanvasMenu />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
