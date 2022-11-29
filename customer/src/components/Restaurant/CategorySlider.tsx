import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";

import styles from "./CategorySlider.module.scss";

interface ContainerProps {
  slides: Slide[] | null;
}

type Slide = {
  id: number;
  name: string;
  photo: string;
};

const CategorySlider: React.FC<ContainerProps> = ({ slides }) => {
  return (
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
      {slides?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className={`d-flex align-items-center ${styles.slideItem}`}>
              <div className={styles.imageContainer}>
                <img
                  src={
                    item.photo == "no-images.jpg"
                      ? "https://via.placeholder.com/500"
                      : item.photo
                  }
                />
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${styles.title}`}
              >
                <h4>{item.name}</h4>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CategorySlider;
