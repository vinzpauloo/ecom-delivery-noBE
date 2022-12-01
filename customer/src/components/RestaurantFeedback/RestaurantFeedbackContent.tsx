import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {} from "react-bootstrap";

import styles from "./RestaurantFeedbackContent.module.scss";
import constants from "../../utils/constants.json";
interface ContainerProps {}

const RestaurantFeedbackContent: React.FC<ContainerProps> = ({}) => {
  const navigate = useNavigate();

  // Get the params from the URL
  const { id } = useParams();

  return <>Restaurant Feedback List</>;
};

export default RestaurantFeedbackContent;
