import React from "react";

import styles from "./OtpContainer.module.scss";
import OtpFormOrder from "./OtpFormOrder";

interface ContainerProps {}

const OtpContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <OtpFormOrder />
    </div>
  );
};

export default OtpContainer;
