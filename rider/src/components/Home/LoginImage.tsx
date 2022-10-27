import React from "react";

import styles from "./LoginImage.module.scss";

import ThisImage from "../../assets/images/rider.png";

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
