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

import styles from "./CartSlider.module.scss";

interface ContainerProps {
  slides: Slide[];
}

type Slide = {
  image: string;
  price: number;
  qty: number;
};

const CartSlider: React.FC<ContainerProps> = ({ slides }) => {
  return (
    <>
      {/* Desktop version */}
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        className={`d-none d-md-block ${styles.sliderContainer}`}
      >
        {slides.map((item, index) => {
          return (
            <SwiperSlide key={index} className={`${styles.sliderContainer}`}>
              <div className={styles.slideItem}>
                <div className={styles.slideImageContainer}>
                  <img src={item.image} alt="" />
                  <div className={styles.slidePriceContainer}>
                    <p className={styles.slidePrice}>{item.price}php</p>
                  </div>
                </div>

                <div
                  className={`d-flex justify-content-center ${styles.slideOptions}`}
                >
                  <div
                    className={`d-flex justify-content-center align-items-center ${styles.qty}`}
                  >
                    <Button>
                      <Dash color="#000000" size={14} />
                    </Button>
                    <span className={styles.num}>{item.qty}</span>
                    <Button>
                      <Plus color="#000000" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CartSlider;
