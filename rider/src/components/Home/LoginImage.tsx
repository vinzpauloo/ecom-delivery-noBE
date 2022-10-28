import React from "react";

import styles from "./LoginImage.module.scss";

import ThisImage from "../../assets/images/rider.png";
import BGImg from "../../assets/images/bg-oppacity.jpg";

interface ContainerProps {}

const LoginImage: React.FC<ContainerProps> = ({}) => {
  return (
    <div className="images">
      <img src={ThisImage} alt="Signin Image" className={`img-fluid`} />
      <img src={BGImg} alt="BG Image" className={`img-fluid`} />
    </div>
  );
};

export default LoginImage;
