import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./HeaderBasic.module.scss";

import LogoHeader from "../../assets/images/logo-header.png";
import LogoHeaderHover from "../../assets/images/logo-header-hover.png";
import PinLight from "../../assets/images/pin-light.png";

interface ContainerProps {}

const HeaderBasic: React.FC<ContainerProps> = () => {
  return (
    <header className={`d-flex align-items-center fixed-top ${styles.header}`}>
      <Container fluid="xxl">
        <Row>
          {/* Brand */}
          <Col>
            <div className="d-flex justify-content-center align-items-center">
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
        </Row>
      </Container>
    </header>
  );
};

export default HeaderBasic;
