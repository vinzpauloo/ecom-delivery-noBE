import React from "react";

import styles from "./SigninImage.module.scss";

import ThisImage from "../../assets/images/signin-image.png";

interface ContainerProps {}

const SigninImage: React.FC<ContainerProps> = ({}) => {
  return (
    <img
      src={ThisImage}
      alt="Signin Image"
      className={`img-fluid ${styles.image}`}
    />
  );
};

export default SigninImage;
