import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Dash, Plus, XCircle } from "react-bootstrap-icons";

import Lottie from "lottie-react";
import recycle from "../../assets/recycle.json";

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
  flavor_name?: string;
  product_flavor_id?: number;
};

type TCart = {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
  flavor_name?: string;
  product_flavor_id?: number;
};

const SwiperSlideItem = (
  item: Slide,
  index: number,
  setCart: ContainerProps["setCart"],
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>,
  setItemToDelete: any
) => {
  // const updateCart = (item: TCart) => {
  //   setCart((current) =>
  //     current.map((obj) => {
  //       if (obj.id === item.id) {
  //         return item;
  //       }

  //       return obj;
  //     })
  //   );
  // };

  // const handleIncrement = (item: TCart) => {
  //   // Prepare new cart item
  //   const newItem = { ...item, quantity: item.quantity + 1 };

  //   // Update cart state
  //   updateCart(newItem);
  // };

  // const handleDecrement = (item: TCart) => {
  //   if (item.quantity > 1) {
  //     // Prepare new cart item
  //     const newItem = { ...item, quantity: item.quantity - 1 };

  //     // Update cart state
  //     updateCart(newItem);
  //   } else {
  //     // Remove item from the cart
  //     setCart((current) =>
  //       current.filter((obj) => {
  //         return obj.id !== item.id;
  //       })
  //     );

  //     console.log("removing item from the cart ...", item.id);
  //   }
  // };

  const handleDelete = (item: TCart) => {
    // Set selected item
    setItemToDelete(item);

    // Show delete modal
    setModalShow(true);
  };

  return (
    <SwiperSlide key={index} className={styles.swiperSlide}>
      <div className={styles.slideItem}>
        <div className={styles.slideImageContainer}>
          <div className={styles.close}>
            <XCircle
              color="#FFFFFF"
              size={16}
              onClick={() => handleDelete(item)}
              className={styles.btnClose}
            />
          </div>
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

        {/* <div className={`d-flex justify-content-center ${styles.slideOptions}`}>
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
        </div> */}

        <div className={styles.cartLabel}>
          <p>
            {`${item.quantity}pc ${item.name}`}{" "}
            {item.flavor_name && `(${item.flavor_name})`}
          </p>
        </div>
      </div>
    </SwiperSlide>
  );
};

const CartSlider: React.FC<ContainerProps> = ({ slides, setCart }) => {
  const [modalShow, setModalShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TCart>();

  const handleDelete = (item: any) => {
    console.log(item);

    setCart((current) =>
      current.filter((obj) => {
        if (obj.product_flavor_id) {
          return obj.product_flavor_id !== item.product_flavor_id;
        } else {
          return obj.id !== item.id;
        }
      })
    );

    setModalShow(false);
  };

  return (
    <>
      {/* Desktop version */}
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        className={`d-none d-md-block ${styles.sliderContainer}`}
      >
        {slides.map((item, index) => {
          return SwiperSlideItem(
            item,
            index,
            setCart,
            setModalShow,
            setItemToDelete
          );
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
          return SwiperSlideItem(
            item,
            index,
            setCart,
            setModalShow,
            setItemToDelete
          );
        })}
      </Swiper>

      {/* Delete modal confirmation */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center pb-2 ${styles.lottie}`}>
            <Lottie animationData={recycle} loop={true} />
            <p className="">Are you sure you want to remove this item?</p>

            <div className="d-flex justify-content-between mx-lg-5 mx-md-4">
              <div className={styles.btnBlack}>
                <Button onClick={() => setModalShow(false)}>Cancel</Button>
              </div>

              <div className={styles.btnBlack}>
                <Button onClick={() => handleDelete(itemToDelete)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartSlider;
