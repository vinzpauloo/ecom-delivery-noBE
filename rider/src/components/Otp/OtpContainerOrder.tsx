import React from "react";

import styles from "./OtpContainer.module.scss";
import OtpFormOrder from "./OtpFormOrder";

interface ContainerProps {}

const OtpContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div>
      <OtpFormOrder />
    </div>
  );
};

export default OtpContainer;
