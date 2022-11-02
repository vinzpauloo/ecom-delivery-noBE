import React from "react";

// Import required modules
import { Autoplay } from "swiper";

import styles from "./LoginImage.module.scss";

import ThisImage from "../../assets/images/slider-chef1.jpg";

interface ContainerProps {}

const LoginImage: React.FC<ContainerProps> = ({}) => {
  return (
    <img
      src={ThisImage}
      alt="Signin Image"
      className={`img-fluid ${styles.image}`}
    />
  );
};

export default LoginImage;
