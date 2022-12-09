import React from "react";

import styles from "./LoginImage.module.scss";

import ThisImage from "../../assets/images/rider3.jpg";
import BGImg from "../../assets/images/bg-oppacity.jpg";

interface ContainerProps {}

const LoginImage: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.images}>
      {/* <img src={BGImg} alt="Signin Image" className={styles.image1} /> */}
      <img src={ThisImage} alt="BG Image" className={styles.image2} />
      {/* <img src={ThisImage} alt="Signin Image" /> */}
    </div>
  );
};

export default LoginImage;
