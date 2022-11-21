import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  Form,
  Collapse,
} from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRiderOTW } from "../../../hooks/useRiderOTW";
import constants from "../../../utils/constants.json";

import styles from "./RewardsContent.module.scss";

import SearchIcon from "../../../assets/images/search.png";
import RiderIcon from "../../../assets/images/riderotw-icon.png";
import KitchenIcon from "../../../assets/images/kitchen-icon.png";
import OrderReceivedIcon from "../../../assets/images/order-received-icon.png";
import RewardsIcon from "../../../assets/images/rewards-icon.png";
import RewardsBtn from "../../../assets/images/rewardsBtn.png";
import RestoIcon from "../../../assets/images/resto.png";
import Delivery from "../../../pages/Account/Delivery";

interface ContainerProps {}

const RewardsContent: React.FC<ContainerProps> = ({}) => {
  const navigate = useNavigate();

  const navigateToDelivery = () => {
    navigate("/account/for-delivery");
  };

  return (
    <Container className={styles.container}>
      <Row>
        <Col xs={6} md={8}>
          <p>My Rewards</p>
        </Col>
        <Col xs={3} md={2}>
          <Button className={styles.statsBtn}>My Stats</Button>
        </Col>
        <Col xs={3} md={2}>
          <CloseButton
            className={styles.closeBtn}
            onClick={navigateToDelivery}
          />
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default RewardsContent;
