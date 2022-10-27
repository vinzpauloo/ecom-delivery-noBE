import React, { useState } from "react";

import "./ResetPasswordContent.scss";

import HideIcon from "../../../assets/images/hide.png";
import ShowIcon from "../../../assets/images/show.png";

interface ContainerProps {}

const ResetPasswordContent: React.FC<ContainerProps> = ({}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  return (
    <div className="reset-password-container">
      <div className="resetpw-container">
        <h3>Reset Password</h3>
        <input placeholder="User Name" />
        <div className="w-hide-icon">
          <input
            placeholder="Current Password"
            type={passwordShown ? "text" : "password"}
          />
          <img
            src={passwordShown ? ShowIcon : HideIcon}
            alt=""
            onClick={togglePassword}
          />
        </div>
        <div className="w-hide-icon">
          <input
            placeholder="New Password"
            type={passwordShown1 ? "text" : "password"}
          />
          <img
            src={passwordShown1 ? ShowIcon : HideIcon}
            alt=""
            onClick={togglePassword1}
          />
        </div>
        <div className="w-hide-icon">
          <input
            placeholder="ReType Password"
            type={passwordShown2 ? "text" : "password"}
          />
          <img
            src={passwordShown2 ? ShowIcon : HideIcon}
            alt=""
            onClick={togglePassword2}
          />
        </div>

        <a>Reset Password</a>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
