import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import required modules
import { Autoplay, EffectFade, Navigation } from "swiper";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-fade";
import "swiper/scss/navigation";

import styles from "./LoginImage.module.scss";

import chef1 from "../../assets/images/chef-1.jpg";
import chef2 from "../../assets/images/chef-2.jpg";
import chef3 from "../../assets/images/chef-3.jpg";

import mobileChef1 from "../../assets/images/mobile-chef-1.png"
import mobileChef2 from "../../assets/images/mobile-chef-2.png"
import mobileChef3 from "../../assets/images/mobile-chef-3.png"

interface ContainerProps {}

const LoginImage: React.FC<ContainerProps> = ({}) => {
  const [imgSource, setImgSource] = useState<any>({
    img1: chef1,
    img2: chef2,
    img3: chef3
  });
  const mobileSize = window.innerWidth <= 991;

  useEffect(() => {
    if(mobileSize){
      setImgSource({
        img1: mobileChef1,
        img2: mobileChef2,
        img3: mobileChef3,
      })
    }
  },[mobileSize])
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
      <SwiperSlide className="bg-white text-center">
        <img src={imgSource.img1} alt="" className={`img-fluid ${styles.image}`} />
      </SwiperSlide>
      <SwiperSlide className="bg-white text-center">
        <img src={imgSource.img2} alt="" className={`img-fluid ${styles.image}`} />
      </SwiperSlide>
      <SwiperSlide className="bg-white text-center">
        <img src={imgSource.img3} alt="" className={`img-fluid ${styles.image}`} />
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
