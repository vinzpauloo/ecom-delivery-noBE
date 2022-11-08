import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useLogout } from "../../hooks/useLogout";
import { useIsAuthenticated } from "react-auth-kit";

import OffcanvasMenu from "./OffcanvasMenu";
import styles from "./Header.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import PinLight from "../../assets/images/pin-light.png";
import SearchIcon from "../../assets/images/search.png";

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
                    Panglao, Bohol, <br />
                    Philippines
                  </p>
                </a>
              </div>
            </div>
          </Col>

          {/* Search + Links for desktop */}
          <Col className="d-none d-lg-block">
            <div className="d-flex justify-content-between align-items-center">
              <div className={styles.search}>
                <input type="text" placeholder="Search..." />
                <img src={SearchIcon} alt="" />
              </div>

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
                    <Link to="/login">Log in</Link>
                    <a href="#">Guest</a>
                  </>
                )}
              </div>
            </div>
          </Col>

          {/* Search + Burger menu for mobile */}
          <Col
            md={{ span: 6, offset: 2 }}
            xs={{ span: 7, offset: 1 }}
            className="d-lg-none"
          >
            <div className="d-flex justify-content-end align-items-center">
              <div className={`flex-fill me-3 ${styles.search}`}>
                <input className="me-10" type="text" placeholder="Search..." />
                <img src={SearchIcon} alt="" />
              </div>

              <OffcanvasMenu />

              {isAuthenticated() ? (
                <div className={styles.account}>
                  <Link to="/account">
                    <Person color="#61481C" size={30} />
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
