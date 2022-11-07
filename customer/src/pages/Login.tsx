import React from "react";
import LoginContainer from "../components/Login/LoginContainer";
import TestApi from "./TestApi";

type Props = {};

const Signin = (props: Props) => {
  return (
    <div className="page">
      <LoginContainer />
      <TestApi />
    </div>
  );
};

export default Signin;
