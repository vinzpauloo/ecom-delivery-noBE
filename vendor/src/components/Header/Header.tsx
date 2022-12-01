import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { List, Person } from "react-bootstrap-icons";
import { useLogout } from "../../hooks/useLogout";
import { useIsAuthenticated } from "react-auth-kit";

import OffcanvasMenu from "./OffcanvasMenu";
import styles from "./Header.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import PinLight from "../../assets/images/pin-light.png";

import Pusher from "pusher-js";

interface ContainerProps {}

const Header: React.FC<ContainerProps> = () => {
  const { logout } = useLogout();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    logout();
  };

  //PusherJS

  const pusher = new Pusher("301049041d7830d91c0e", {
    cluster: "ap1",
  });
  console.log("PUSHER", pusher);

  Pusher.logToConsole = true;

  const restaurant_id = 8;

  const channel = pusher.subscribe("restaurant-" + restaurant_id);

  channel.bind("Create-Order-Status", function (data) {
    alert(`New order has arrived`);
  });

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
                <Link to="/account">
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
          ></Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
