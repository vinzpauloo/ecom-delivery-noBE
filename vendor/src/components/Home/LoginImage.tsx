import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import required modules
import { Autoplay, EffectFade, Navigation } from "swiper";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-fade";
import "swiper/scss/navigation";

import styles from "./LoginImage.module.scss";

import chef1 from "../../assets/images/slider-chef1.jpg";
import chef2 from "../../assets/images/slider-chef2.jpg";
import chef3 from "../../assets/images/slider-chef3.jpg";

interface ContainerProps {}

const LoginImage: React.FC<ContainerProps> = ({}) => {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      effect={"fade"}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectFade]}
    >
      <SwiperSlide className="bg-white">
        <img src={chef1} alt="" className={`img-fluid ${styles.image}`} />
      </SwiperSlide>
      <SwiperSlide className="bg-white">
        <img src={chef2} alt="" className={`img-fluid ${styles.image}`} />
      </SwiperSlide>
      <SwiperSlide className="bg-white">
        <img src={chef3} alt="" className={`img-fluid ${styles.image}`} />
      </SwiperSlide>
    </Swiper>
    // <img
    //   src={chef1}
    //   alt="Login Image"
    //   className={`img-fluid ${styles.image}`}
    // />
  );
};

export default LoginImage;
