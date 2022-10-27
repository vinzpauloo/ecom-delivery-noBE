import { Container } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-fade";
import "swiper/scss/navigation";

// Import required modules
import { Autoplay, EffectFade, Navigation } from "swiper";

import styles from "./Lunbo.module.scss";

interface ContainerProps {
  slides: Slide[];
}

type Slide = {
  image: string;
  title: string;
  description: string;
  positionClass: string;
};

const Lunbo: React.FC<ContainerProps> = ({ slides }) => {
  return (
    <Container fluid className="p-0 lunbo-slider">
      <Swiper
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Navigation]}
      >
        {slides.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={styles.slideItem}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div
                  className={`${styles.position} ${styles[item.positionClass]}`}
                >
                  <div className={styles.slideShade}>
                    <div className={styles.slideContent}>
                      <h2 className="m-0">{item.title}</h2>
                      <p className="m-0">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default Lunbo;
