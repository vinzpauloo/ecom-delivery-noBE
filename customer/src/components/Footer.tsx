import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import LogoFooter from "../assets/images/logo-footer.png";
import LogoFooterHover from "../assets/images/logo-footer-hover.png";
import PinDark from "../assets/images/pin-dark.png";
import SocialFacebook from "../assets/images/social-facebook.png";
import SocialInstagram from "../assets/images/social-instagram.png";
import SocialMessenger from "../assets/images/social-messenger.png";
import SocialSkype from "../assets/images/social-skype.png";
import SocialTelegram from "../assets/images/social-telegram.png";
import SocialEmail from "../assets/images/social-email.png";

import styles from "./Footer.module.scss";

const socialMedias = [
  {
    image: SocialTelegram,
    link: "https://t.me/+639475359214",
  },
  // {
  //   image: SocialTwitter,
  //   link: "#",
  // },
  {
    image: SocialFacebook,
    link: "https://www.facebook.com/plusonebento",
  },
  {
    image: SocialInstagram,
    link: "https://www.instagram.com/plusonebentobohol/",
  },
  // {
  //   image: SocialSkype,
  //   link: "#",
  // },
  {
    image: SocialMessenger,
    link: "http://m.me/plusonebento",
  },
  {
    image: SocialEmail,
    link: "mailto:support@foodmonkey.ph",
  },
];

interface ContainerProps {}

const Footer: React.FC<ContainerProps> = () => {
  return (
    <footer className={`${styles.footer}`}>
      <Container fluid="xxl">
        <Row
          lg={4}
          xs={1}
          className={`justify-content-center align-items-center gap-1 gap-lg-0 ${styles.container}`}
        >
          {/* Logo (web only) */}
          <Col className="d-none d-lg-block">
            <div className={styles.logo}>
              <Link to="/">
                <img src={LogoFooter} alt="Food Monkey Logo" />
                <img
                  src={LogoFooterHover}
                  alt="Food Monkey Logo"
                  className={styles.logoHover}
                />
              </Link>
            </div>
          </Col>

          {/* Location (web only) */}
          <Col className="d-none d-lg-block">
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

          {/* Social media links */}
          <Col className="">
            <Row lg={6} xs="auto" className={styles.socials}>
              {socialMedias.map((item, index) => {
                return (
                  <Col key={index}>
                    <a href={item.link} target="_blank">
                      <img src={item.image} alt="" />
                    </a>
                  </Col>
                );
              })}
            </Row>
          </Col>

          {/* Logo + location (mobile only) */}
          <Col className="d-lg-none">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <div className={styles.logo}>
                <Link to="/">
                  <img src={LogoFooter} alt="Food Monkey Logo" />
                  <img
                    src={LogoFooterHover}
                    alt="Food Monkey Logo"
                    className={styles.logoHover}
                  />
                </Link>
              </div>
              <div className={styles.location}>
                <Link
                  to="#"
                  className="d-flex align-items-center justify-content-center text-decoration-none"
                >
                  <img src={PinDark} alt="Pin" />
                  <p>Panglao, Bohol, Philippines</p>
                </Link>
              </div>
            </div>
          </Col>

          {/* All rights reserved */}
          <Col className="">
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
