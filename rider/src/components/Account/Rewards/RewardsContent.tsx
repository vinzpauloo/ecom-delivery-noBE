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
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CloseButton from "react-bootstrap/CloseButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import constants from "../../../utils/constants.json";
import { motion } from "framer-motion";

import slider1 from "../../../assets/images/slider1.png";
import slider2 from "../../../assets/images/slider2.png";
import slider3 from "../../../assets/images/slider3.png";
import slider4 from "../../../assets/images/slider4.png";
import slider5 from "../../../assets/images/slider5.png";
import tarsier from "../../../assets/images/tarsier.png";
import star from "../../../assets/images/star.png";
import riderGPS from "../../../assets/images/riderGPS.png";

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

  const locale = "en";
  const [today, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a function to clear the timer so that it will stop being called on unmount
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${today.toLocaleDateString(locale, {
    month: "long",
  })} ${today.getDate()} \n\n`;

  const hour = today.getHours();

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  const year = today.getFullYear();

  const percentage = 75;

  return (
    <Container className={styles.container}>
      <Row>
        <Col xs={7} md={8}>
          <p>My Rewards</p>
        </Col>
        <Col xs={3} md={3}>
          <motion.div whileTap={{ x: -1000 }} transition={{ duration: 2 }}>
            <Button className={styles.statsBtn}>My Stats</Button>
          </motion.div>
        </Col>
        <Col xs={{ span: 1, offset: 1 }} md={{ span: 0, offset: 0 }}>
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
      <Row>
        <div className={styles.dateContainer}>
          {time}&nbsp;
          <span>|</span>&nbsp;
          {date},&nbsp;{year}
        </div>
      </Row>
      <Row className={`${styles.progressBarRow} mt-5`}>
        <Col xs={12} md={7}>
          <Row>
            <h6>20 Deliveries per day</h6>
            <Col xs={9} md={10}>
              <ProgressBar className={styles.progressBar}>
                <ProgressBar
                  now={percentage}
                  label={`${percentage}%`}
                  variant="warning"
                  className={styles.progressBar1}
                  key={1}
                />
                <ProgressBar
                  now={25}
                  label={`${100 - percentage}%`}
                  variant="secondary"
                  className={styles.progressBar2}
                  key={2}
                />
              </ProgressBar>
            </Col>
            <Col xs={3} md={2}>
              <img src={star} />
            </Col>
            <p>
              Deliver 20 meal a day to get an exciting reward from FoodMonkey
            </p>
          </Row>
          <Row>
            <h6>100 Deliveries per week or in 7 days</h6>
            <Col xs={9} md={10}>
              <ProgressBar className={styles.progressBar}>
                <ProgressBar
                  now={percentage}
                  label={`${percentage}%`}
                  variant="warning"
                  className={styles.progressBar1}
                  key={1}
                />
                <ProgressBar
                  now={25}
                  label={`${100 - percentage}%`}
                  variant="secondary"
                  className={styles.progressBar2}
                  key={2}
                />
              </ProgressBar>
            </Col>
            <Col xs={3} md={2}>
              <img src={star} />
            </Col>
            <p>
              Deliver 100 meal in a week or 7 days to get an exciting reward
              from FoodMonkey
            </p>
          </Row>
          <Row>
            <h6>300 Deliveries week or in 7 days</h6>
            <Col xs={9} md={10}>
              <ProgressBar className={styles.progressBar}>
                <ProgressBar
                  now={percentage}
                  label={`${percentage}%`}
                  variant="warning"
                  className={styles.progressBar1}
                  key={1}
                />
                <ProgressBar
                  now={25}
                  label={`${100 - percentage}%`}
                  variant="secondary"
                  className={styles.progressBar2}
                  key={2}
                />
              </ProgressBar>
            </Col>
            <Col xs={3} md={2}>
              <img src={star} />
            </Col>
            <p>
              Deliver 300 meal in a month or 30 days to get an exciting reward
              from FoodMonkey
            </p>
          </Row>
        </Col>
        <Col xs={12} md={{ span: 5, offset: 0 }} className={styles.riderImg}>
          <img src={riderGPS} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default RewardsContent;
