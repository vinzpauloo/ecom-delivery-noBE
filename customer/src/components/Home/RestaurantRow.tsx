import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Swiper components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/scss";
import "swiper/scss/effect-fade";
import "swiper/scss/navigation";

import styles from "./RestaurantRow.module.scss";

interface ContainerProps {
  slides: TSlide[];
}

type TSlide = {
  id: string;
  name: string;
  address: string;
  photo: string;
  social_link: string;
};

const RestaurantRow: React.FC<ContainerProps> = ({ slides }) => {
  return (
    <Container fluid="xxl" className={styles.container}>
      <h3 className={styles.sectionTitle}>Shop by Restaurants</h3>

      {/* Restaurant slider for desktop */}
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1200: {
            slidesPerView: 5,
          },
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className={`d-none d-lg-block ${styles.sliderContainer}`}
      >
        {slides.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={styles.slideItem}>
                <div className={styles.slideImageContainer}>
                  <img
                    // src={process.env.REACT_APP_BASE_URL + item.photo}
                    src={item.photo}
                    alt=""
                  />
                </div>
                <div className={styles.slideContentContainer}>
                  <p className={styles.slideTitle}>{item.name}</p>
                  <p className={styles.slideDescription}>{item.address}</p>
                  <Link
                    to={`/restaurants/${item.id}`}
                    className={styles.slideLink}
                  >
                    Visit
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Restaurant grid for mobile */}
      <div
        className={`d-lg-none d-flex flex-wrap justify-content-center ${styles.restaurantGrid}`}
      >
        {slides.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex-grow-1 ${styles.sliderContainer}`}
            >
              <div className={styles.slideItem}>
                <div className={styles.slideImageContainer}>
                  <img
                    // src={process.env.REACT_APP_BASE_URL + item.photo}
                    src={item.photo}
                    alt=""
                  />
                </div>
                <div className={styles.slideContentContainer}>
                  <p className={styles.slideTitle}>{item.name}</p>
                  <p className={styles.slideDescription}>{item.address}</p>
                  <Link
                    to={`/restaurants/${item.id}`}
                    className={styles.slideLink}
                  >
                    Visit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default RestaurantRow;
