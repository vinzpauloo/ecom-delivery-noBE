import React, { useEffect, useState } from "react";
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
import placeholder from "../../assets/images/placeholder.png";

interface ContainerProps {
  slides: Slide[];
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
}

type Slide = {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  is_available: number;
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
  setCart: ContainerProps["setCart"],
  quantity: any,
  setQuantity: any
) => {
  // const [thisQuantity, setThisQuantity] = useState(1);

  const getThisQuantity = (index: number) => {
    if (quantity && quantity[index]) {
      return quantity[index];
    }
    return 1;
  };

  const handleUpdateQuantity = (index: number, value: number) => {
    console.log("handleUpdateQuantity");
    console.log(index, value);

    setQuantity((qty: any) => {
      let qtyCopy = qty.slice();

      if (!qtyCopy[index] && value === 1) {
        qtyCopy[index] = 2;
      } else {
        if (qtyCopy[index]) {
          qtyCopy[index] = qtyCopy[index] + value;
        }
      }

      console.log(qtyCopy);

      return qtyCopy;
    });
  };

  const handleAddToCart = (index: number) => {
    const newItem = {
      id: item.id,
      name: item.name,
      photo: item.photo,
      price: item.price,
      quantity: quantity[index] || 1,
    };

    console.log("add to cart", newItem);

    setCart((cart) => {
      const cartCopy = cart.slice();
      const index = cartCopy.findIndex((product) => newItem.id === product.id);

      if (index === -1) {
        cartCopy.push({ ...newItem });
      } else {
        const pr = cartCopy[index];
        cartCopy[index] = { ...pr, quantity: pr.quantity + newItem.quantity };
      }

      return cartCopy;
    });

    // reset quantity
    setQuantity((qty: any) => {
      let qtyCopy = qty.slice();
      qtyCopy[index] = 0;

      return qtyCopy;
    });

    console.log("Added new item in cart ...");
    console.log(newItem);
  };

  return (
    <SwiperSlide key={index} className={styles.swiperSlide}>
      <div className={styles.slideItem}>
        <div className={styles.slideImageContainer}>
          {item.photo == "no-images.jpg" ? (
            <img className={styles.placeholder} src={placeholder} alt="" />
          ) : (
            // <img src={process.env.REACT_APP_BASE_URL + item.photo} alt="" />
            <img src={item.photo} alt="" />
          )}
        </div>
        <div className={styles.slideContentContainer}>
          <p className={styles.slideTitle}>{item.name}</p>
          <p className={styles.slideDescription}>{item.description}</p>
          <p className={styles.slidePrice}>{item.price}php</p>
          <div
            className={`d-flex justify-content-between ${styles.slideOptions}`}
          >
            <div
              className={`d-flex justify-content-center align-items-center ${styles.quantity}`}
            >
              <Button>
                <Dash
                  color="#61481C"
                  size={18}
                  // onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  onClick={() => handleUpdateQuantity(index, -1)}
                />
              </Button>
              <span className={styles.num}>{getThisQuantity(index)}</span>
              <Button>
                <Plus
                  color="#61481C"
                  size={18}
                  // onClick={() => setQuantity(quantity + 1)}
                  onClick={() => handleUpdateQuantity(index, 1)}
                />
              </Button>
            </div>
            <div className={styles.addToCart}>
              <Button onClick={() => handleAddToCart(index)}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

const MenuSlider: React.FC<ContainerProps> = ({ slides, setCart }) => {
  const [quantity, setQuantity] = useState<any[]>();

  useEffect(() => {
    if (slides.length) {
      setQuantity(Array(slides.length));
    }
  }, [slides]);

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
        {slides?.map((item, index) => {
          return SwiperSlideItem(item, index, setCart, quantity, setQuantity);
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
        {slides?.map((item, index) => {
          return SwiperSlideItem(item, index, setCart, quantity, setQuantity);
        })}
      </Swiper>
    </>
  );
};

export default MenuSlider;
