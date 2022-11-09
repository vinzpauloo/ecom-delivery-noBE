import React from "react";
import { Button } from "react-bootstrap";
import { Dash, Plus } from "react-bootstrap-icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/grid";
import "swiper/scss/navigation";

// Import required modules
import { Grid, Navigation } from "swiper";

import styles from "./MenuSlider.module.scss";

interface ContainerProps {
  slides: Slide[];
}

type Slide = {
  image: string;
  title: string;
  description: string;
};

const SwiperSlideItem = (item: Slide, index: number) => {
  return (
    <SwiperSlide key={index} className={styles.swiperSlide}>
      <div className={styles.slideItem}>
        <div className={styles.slideImageContainer}>
          <img src={item.image} alt="" />
        </div>
        <div className={styles.slideContentContainer}>
          <p className={styles.slideTitle}>{item.title}</p>
          <p className={styles.slideDescription}>{item.description}</p>
          <p className={styles.slidePrice}>423php</p>
          <div
            className={`d-flex justify-content-between ${styles.slideOptions}`}
          >
            <div
              className={`d-flex justify-content-center align-items-center ${styles.qty}`}
            >
              <Button>
                <Dash color="#61481C" size={18} />
              </Button>
              <span className={styles.num}>1</span>
              <Button>
                <Plus color="#61481C" size={18} />
              </Button>
            </div>
            <div className={styles.addToCart}>
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

const MenuSlider: React.FC<ContainerProps> = ({ slides }) => {
  return (
    <>
      {/* Desktop version */}
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className={`d-none d-lg-block ${styles.sliderContainer}`}
      >
        {slides.map((item, index) => {
          return SwiperSlideItem(item, index);
        })}
      </Swiper>

      {/* Mobile version */}
      <Swiper
        slidesPerView={2.15}
        spaceBetween={10}
        grid={{
          rows: 2,
        }}
        breakpoints={{
          576: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 3.5,
          },
        }}
        modules={[Grid]}
        className={`d-lg-none ${styles.sliderContainer}`}
      >
        {slides.map((item, index) => {
          return SwiperSlideItem(item, index);
        })}
      </Swiper>
    </>
  );
};

export default MenuSlider;
