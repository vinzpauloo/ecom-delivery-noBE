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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import constants from "../../../utils/constants.json";

import slider1 from "../../../assets/images/slider1.png";
import slider2 from "../../../assets/images/slider2.png";
import slider3 from "../../../assets/images/slider3.png";
import slider4 from "../../../assets/images/slider4.png";
import slider5 from "../../../assets/images/slider5.png";
import tarsier from "../../../assets/images/tarsier.png";

import styles from "./RewardsContent.module.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";

interface ContainerProps {}

// type Slide = {
//   id: number;
//   name: string;
//   photo: string;
// };

const RewardsContent: React.FC<ContainerProps> = ({}) => {
  const navigate = useNavigate();

  const navigateToDelivery = () => {
    navigate("/account/for-delivery");
  };

  const [over, setOver] = useState(false);
  const [over1, setOver1] = useState(false);
  const [over2, setOver2] = useState(false);
  const [over3, setOver3] = useState(false);
  const [over4, setOver4] = useState(false);
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
      <Row>
        <Swiper
          slidesPerView={3.3}
          spaceBetween={10}
          breakpoints={{
            576: {
              slidesPerView: 4.4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4.7,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className={`${styles.sliderContainer}`}
        >
          {/* {slides?.map((item, index) => { */}
          return (
          <SwiperSlide>
            <div className={`d-flex align-items-center ${styles.slideItem}`}>
              <div
                className={styles.imageContainer}
                onMouseOver={() => setOver(true)}
                onMouseOut={() => setOver(false)}
              >
                <img src={over ? tarsier : slider1} alt="test" />
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.title}`}
              >
                <h4>Gasoline Allowance</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`d-flex align-items-center ${styles.slideItem}`}>
              <div
                className={styles.imageContainer}
                onMouseOver={() => setOver1(true)}
                onMouseOut={() => setOver1(false)}
              >
                <img src={over1 ? tarsier : slider2} alt="test" />
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.title}`}
              >
                <h4>Holiday Rewards</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`d-flex align-items-center ${styles.slideItem}`}>
              <div
                className={styles.imageContainer}
                onMouseOver={() => setOver2(true)}
                onMouseOut={() => setOver2(false)}
              >
                <img src={over2 ? tarsier : slider3} alt="test" />
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.title}`}
              >
                <h4>Eat, Sleep, Grind</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`d-flex align-items-center ${styles.slideItem}`}>
              <div
                className={styles.imageContainer}
                onMouseOver={() => setOver3(true)}
                onMouseOut={() => setOver3(false)}
              >
                <img src={over3 ? tarsier : slider4} alt="test" />
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.title}`}
              >
                <h4>Free Lunch</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`d-flex align-items-center ${styles.slideItem}`}>
              <div
                className={styles.imageContainer}
                onMouseOver={() => setOver4(true)}
                onMouseOut={() => setOver4(false)}
              >
                <img src={over4 ? tarsier : slider5} alt="test" />
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.title}`}
              >
                <h4>Beers and Wines</h4>
              </div>
            </div>
          </SwiperSlide>
          );
          {/* })} */}
        </Swiper>
      </Row>
    </Container>
  );
};

export default RewardsContent;
