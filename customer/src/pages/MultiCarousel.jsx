import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./MultiCarousel.css";

import { Autoplay } from "swiper";

import cat1 from "../assets/images/category01.jpg";
import cat2 from "../assets/images/category02.jpg";
import cat3 from "../assets/images/category03.jpg";
import cat4 from "../assets/images/category04.jpg";
import cat5 from "../assets/images/category05.jpg";
import cat6 from "../assets/images/category06.jpg";
import cat7 from "../assets/images/category07.jpg";

const MultiCarousel = ({}) => {
  return (
    <div className="row mx-1">
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        className="multi-carousel-container"
      >
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat1} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat2} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat3} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat4} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat5} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat6} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat7} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat4} alt="" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MultiCarousel;
