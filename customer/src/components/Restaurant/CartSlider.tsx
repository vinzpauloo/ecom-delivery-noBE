import React from "react";
import { Button } from "react-bootstrap";
import { Dash, Plus } from "react-bootstrap-icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/grid";

// Import required modules
import { Grid } from "swiper";

import styles from "./CartSlider.module.scss";

interface ContainerProps {
  slides: Slide[];
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
}

type Slide = {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
};

type TCart = {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
};

const SwiperSlideItem = (
  item: Slide,
  index: number,
  setCart: ContainerProps["setCart"]
) => {
  const updateCart = (item: TCart) => {
    setCart((current) =>
      current.map((obj) => {
        if (obj.id === item.id) {
          return item;
        }

        return obj;
      })
    );
  };

  const handleIncrement = (item: TCart) => {
    // Prepare new cart item
    const newItem = { ...item, quantity: item.quantity + 1 };

    // Update cart state
    updateCart(newItem);
  };

  const handleDecrement = (item: TCart) => {
    if (item.quantity > 1) {
      // Prepare new cart item
      const newItem = { ...item, quantity: item.quantity - 1 };

      // Update cart state
      updateCart(newItem);
    } else {
      // Remove item from the cart
      setCart((current) =>
        current.filter((obj) => {
          return obj.id !== item.id;
        })
      );

      console.log("removing item from the cart ...", item.id);
    }
  };

  return (
    <SwiperSlide key={index} className={styles.swiperSlide}>
      <div className={styles.slideItem}>
        <div className={styles.slideImageContainer}>
          <img
            src={
              item.photo == "no-images.jpg"
                ? "https://via.placeholder.com/500"
                : // : process.env.REACT_APP_BASE_URL + item.photo
                  item.photo
            }
            alt=""
          />
          <div className={styles.slidePriceContainer}>
            <p className={styles.slidePrice}>{item.price}php</p>
          </div>
        </div>

        <div className={`d-flex justify-content-center ${styles.slideOptions}`}>
          <div
            className={`d-flex justify-content-center align-items-center ${styles.quantity}`}
          >
            <Button>
              <Dash
                color="#000000"
                size={14}
                onClick={() => handleDecrement(item)}
              />
            </Button>
            <span className={styles.num}>{item.quantity}</span>
            <Button>
              <Plus
                color="#000000"
                size={14}
                onClick={() => handleIncrement(item)}
              />
            </Button>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

const CartSlider: React.FC<ContainerProps> = ({ slides, setCart }) => {
  return (
    <>
      {/* Desktop version */}
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        className={`d-none d-md-block ${styles.sliderContainer}`}
      >
        {slides.map((item, index) => {
          return SwiperSlideItem(item, index, setCart);
        })}
      </Swiper>

      {/* Mobile version */}
      <Swiper
        slidesPerView={2.25}
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
        className={`d-md-none ${styles.sliderContainer}`}
      >
        {slides.map((item, index) => {
          return SwiperSlideItem(item, index, setCart);
        })}
      </Swiper>
    </>
  );
};

export default CartSlider;
