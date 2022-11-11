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
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col>
            <div className={` ${styles.logo}`}>
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
          </Col>

          <Col>
            <div className={`${styles.location}`}>
              <a
                href="#"
                className="d-flex align-items-center justify-content-center text-decoration-none"
              >
                <img src={PinLight} alt="Pin" />
                <p className="mb-0">
                  Panglao, Bohol<span>, Philippines</span>
                </p>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
