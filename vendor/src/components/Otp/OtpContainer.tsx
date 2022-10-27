import React from "react";

import styles from "./OtpContainer.module.scss";
import OtpForm from "./OtpForm";

interface ContainerProps {}

const OtpContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <OtpForm />
    </div>
  );
};

export default OtpContainer;
