import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Swiper components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";

import styles from "./CategoryRow.module.scss";

interface ContainerProps {
  title: string;
  type: string;
  slides: TSlide[];
}

type TSlide = {
  id: number;
  name: string;
  photo: string;
};

const CategoryRow: React.FC<ContainerProps> = ({ title, type, slides }) => {
  return (
    <Container fluid="xxl" className={styles.container}>
      <h3 className={styles.sectionTitle}>Shop by {title}</h3>

      {slides.length ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={5}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            576: {
              slidesPerView: 4,
              spaceBetween: 7,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            992: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 15,
            },
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className={styles.sliderContainer}
        >
          {slides.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                <Link
                  to={`/restaurants/${type}/${item.id}`}
                  className="text-decoration-none"
                >
                  <div className={styles.slideItem}>
                    <div className={styles.slideImageContainer}>
                      <img
                        src={process.env.REACT_APP_BASE_URL + item.photo}
                        alt=""
                      />
                    </div>
                    <div className={styles.slideContentContainer}>
                      <p className="mb-0 lh-1">{item.name}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <>Loading ...</>
      )}
    </Container>
  );
};

export default CategoryRow;
