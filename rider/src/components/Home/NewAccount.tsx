import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import SocialFacebook from "../../assets/images/social-facebook.png";
import SocialInstagram from "../../assets/images/social-instagram.png";
import SocialSkype from "../../assets/images/social-skype.png";

import styles from "./NewAccount.module.scss";

const socialMedias = [
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
];

interface ContainerProps {}

const NewAccount: React.FC<ContainerProps> = ({}) => {
  return (
    <div className="mt-4 text-center">
      <p>
        Register new account{" "}
        <Link to="/registration" className={styles.textLink}>
          here
        </Link>
        <br />
        <span className={styles.small}>or connect using</span>
      </p>
      <div>
        <Row xs="auto" className={styles.socials}>
          {socialMedias.map((item, index) => {
            return (
              <Col key={index}>
                <Link to={item.link}>
                  <img src={item.image} alt="" className="img-fluid" />
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default NewAccount;
