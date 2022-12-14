import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
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
  setQuantity: any,
  setModalShow: any,
  setItem: any,
  setSelectedMenuIndex: any,
  addToCartAction: any
) => {
  const getThisQuantity = (index: number) => {
    if (quantity && quantity[index]) {
      return quantity[index];
    }
    return 1;
  };

  const handleUpdateQuantity = (index: number, value: number) => {
    setQuantity((qty: any) => {
      let qtyCopy = qty.slice();

      if (!qtyCopy[index] && value === 1) {
        qtyCopy[index] = 2;
      } else {
        if (qtyCopy[index]) {
          qtyCopy[index] = qtyCopy[index] + value;
        }
      }

      return qtyCopy;
    });
  };

  const handleAddToCart = (index: number) => {
    const hasFlavor = true;

    if (hasFlavor) {
      // Show modal popup for flavor
      setItem(item);
      setSelectedMenuIndex(index);
      setModalShow(true);
    } else {
      addToCartAction(index);
    }
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
  const [modalShow, setModalShow] = useState(false);
  const [flavor, setFlavor] = useState(0);
  const [item, setItem] = useState<Slide>();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const addToCartAction = (index: number) => {
    if (item) {
      const newItem = {
        id: item.id,
        name: item.name,
        photo: item.photo,
        price: item.price,
        quantity: quantity ? (quantity[index] ? quantity[index] : 1) : 1,
      };

      setCart((cart) => {
        const cartCopy = cart.slice();
        const index = cartCopy.findIndex(
          (product) => newItem.id === product.id
        );

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

      // console.log("Added new item in cart ...", newItem);

      setModalShow(false);
    }
  };

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
          return SwiperSlideItem(
            item,
            index,
            setCart,
            quantity,
            setQuantity,
            setModalShow,
            setItem,
            setSelectedMenuIndex,
            addToCartAction
          );
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
          return SwiperSlideItem(
            item,
            index,
            setCart,
            quantity,
            setQuantity,
            setModalShow,
            setItem,
            setSelectedMenuIndex,
            addToCartAction
          );
        })}
      </Swiper>

      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        className={styles.modal}
        centered
      >
        <Modal.Body className={styles.modalBody}>
          <div className={styles.modalContent}>
            <h6 className="mb-0 text-center">Choose your desired flavor</h6>

            <ul className={styles.flavors}>
              <li>
                <Form.Check
                  type="radio"
                  id="flavor-1"
                  name="flavor"
                  className={styles.check}
                >
                  <Form.Check.Input
                    type="radio"
                    onChange={() => setFlavor(1)}
                    checked={flavor === 1}
                  />
                  <Form.Check.Label>
                    <div>Original</div>
                    <div>Free</div>
                  </Form.Check.Label>
                </Form.Check>
              </li>
              <li>
                <Form.Check
                  type="radio"
                  id="flavor-2"
                  name="flavor"
                  checked={flavor === 2}
                  className={styles.check}
                >
                  <Form.Check.Input
                    type="radio"
                    onChange={() => setFlavor(2)}
                    checked={flavor === 2}
                  />
                  <Form.Check.Label>
                    <div>Spicy</div>
                    <div>P5.00</div>
                  </Form.Check.Label>
                </Form.Check>
              </li>
              <li>
                <Form.Check
                  type="radio"
                  id="flavor-3"
                  name="flavor"
                  checked={flavor === 3}
                  className={styles.check}
                >
                  <Form.Check.Input
                    type="radio"
                    onChange={() => setFlavor(3)}
                    checked={flavor === 3}
                  />
                  <Form.Check.Label>
                    <div>Cheese</div>
                    <div>P8.00</div>
                  </Form.Check.Label>
                </Form.Check>
              </li>
            </ul>

            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => addToCartAction(selectedMenuIndex)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuSlider;
