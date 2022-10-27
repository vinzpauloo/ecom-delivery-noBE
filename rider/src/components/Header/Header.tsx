import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { List, Person } from "react-bootstrap-icons";

import OffcanvasMenu from "./OffcanvasMenu";
import styles from "./Header.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import PinLight from "../../assets/images/pin-light.png";

import { useAuthContext } from "../../hooks/useAuthContext";

interface ContainerProps {}

const Header: React.FC<ContainerProps> = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    // remove user from storage
    localStorage.removeItem(user);

    // Dispatch logout action
    dispatch({ type: "LOGOUT" });

    navigate("/");

    console.log("logout!");
  };

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
                  <p className="mb-0">
                    Tagbiliran, Bohol, <br />
                    Philippines
                  </p>
                </a>
              </div>
            </div>
          </Col>

          {/* Search + Links for desktop */}
          <Col className="d-none d-lg-block">
            <div className={`lh-1 text-end ${styles.links}`}>
              {user ? (
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

              <a href="#">
                <div className={styles.account}>
                  <Person color="#61481C" size={30} />
                </div>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
