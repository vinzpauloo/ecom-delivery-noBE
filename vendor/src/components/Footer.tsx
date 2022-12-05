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

import styles from "./Footer.module.scss";

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
  return (
    // <footer className={`fixed-bottom ${styles.footer}`}>
    <footer className={`${styles.footer} d-none d-lg-block`}>
      <Container fluid="xxl">
        <Row
          // lg={5}
          lg={4}
          xs={1}
          className={`justify-content-center align-items-center ${styles.container}`}
        >
          { location.pathname !== "/" && (
            <>
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

              {/* <Col>
                <div className={`d-none d-lg-flex justify-content-center`}>
                  <ul className={styles.navigation}>
                    {links.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.link}>{item.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col> */}

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
            </>
        )}

          <Col>
            <div className="text-center">
              <p>
                All Rights Reserved <strong>2022</strong> Food Monkey
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
