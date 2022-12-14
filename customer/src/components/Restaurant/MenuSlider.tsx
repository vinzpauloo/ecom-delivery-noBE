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
  flavors?: any;
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
  quantity: any,
  setQuantity: any,
  setModalShow: any,
  setItem: any,
  setSelectedMenuIndex: any,
  setFlavor: any,
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
    const hasFlavor = !!item.flavors.length;
    console.log(hasFlavor, item.flavors);

    // Set selected menu item
    setItem(item);
    setSelectedMenuIndex(index);

    if (hasFlavor) {
      // Show modal popup if item has flavors
      setModalShow(true);
      setFlavor({
        product_flavor_id: item.flavors[0].id,
        name: item.flavors[0].name,
        price: item.flavors[0].price,
      });
    } else {
      // Simply add to cart
      addToCartAction(index, item);
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
  const [flavor, setFlavor] = useState<any>();
  const [item, setItem] = useState<Slide>();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const addToCartAction = (index: number, addedItem: any) => {
    console.log("Add to cart action");
    console.log(addedItem, flavor);

    if (addedItem) {
      let newItem = {
        id: addedItem.id,
        name: addedItem.name,
        photo: addedItem.photo,
        price: addedItem.price,
        quantity: quantity ? (quantity[index] ? quantity[index] : 1) : 1,
        flavor_name: flavor?.name,
        flavor_price: flavor?.price,
        product_flavor_id: flavor?.product_flavor_id,
      };

      // Remove flavor_name & product_flavor_id key if empty/null
      if (!flavor) {
        delete newItem.flavor_name;
        delete newItem.flavor_price;
        delete newItem.product_flavor_id;
      }

      console.log("newItem", newItem);

      setCart((cart) => {
        const cartCopy = cart.slice();
        const index = cartCopy.findIndex(
          (product) => newItem.id === product.id
        );

        console.log("cartCopy", cartCopy);

        // Check if flavor already exists in the cart
        const flavorIndex = cartCopy.findIndex(
          (product) => newItem.product_flavor_id === product.product_flavor_id
        );

        console.log("flavorIndex", flavorIndex);

        if (index === -1) {
          cartCopy.push({ ...newItem });
        } else {
          if (flavorIndex === -1) {
            console.log("product with flavor not yet exist");
            cartCopy.push({ ...newItem });
          } else {
            console.log("product with flavor already exist");
            const pr = cartCopy[flavorIndex];
            cartCopy[flavorIndex] = {
              ...pr,
              quantity: pr.quantity + newItem.quantity,
            };
          }
        }

        return cartCopy;
      });

      // reset quantity
      setQuantity((qty: any) => {
        let qtyCopy = qty.slice();
        qtyCopy[index] = 0;

        return qtyCopy;
      });

      // reset flavor
      setFlavor(null);

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
            setFlavor,
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
            setFlavor,
            addToCartAction
          );
        })}
      </Swiper>

      {/* Flavor modal */}
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
              {item?.flavors?.map((current: any, index: number) => {
                return (
                  <li key={index}>
                    <Form.Check
                      type="radio"
                      id={`flavor-${current.id}`}
                      name="flavor"
                      className={styles.check}
                    >
                      <Form.Check.Input
                        type="radio"
                        onChange={() =>
                          setFlavor({
                            product_flavor_id: current.id,
                            name: current.name,
                            price: current.price,
                          })
                        }
                        checked={
                          flavor
                            ? flavor.product_flavor_id === current.id
                            : false
                        }
                      />
                      <Form.Check.Label>
                        <div>{current.name}</div>
                        <div>{current.price}</div>
                      </Form.Check.Label>
                    </Form.Check>
                  </li>
                );
              })}

              {/* <li>
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
              </li> */}
            </ul>

            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => addToCartAction(selectedMenuIndex, item)}
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
