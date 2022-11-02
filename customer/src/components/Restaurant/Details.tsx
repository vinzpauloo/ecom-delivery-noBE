import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Dash, Plus } from "react-bootstrap-icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper";

import styles from "./Details.module.scss";

import restau01 from "../../assets/images/restau01.png";
import cuisine01 from "../../assets/images/cuisine01.png";
import cuisine02 from "../../assets/images/cuisine02.png";
import cuisine03 from "../../assets/images/cuisine03.png";
import cuisine04 from "../../assets/images/cuisine04.png";
import cuisine05 from "../../assets/images/cuisine05.png";
import category01 from "../../assets/images/category01.jpg";
import category02 from "../../assets/images/category02.jpg";
import category03 from "../../assets/images/category03.jpg";
import category04 from "../../assets/images/category04.jpg";
import category05 from "../../assets/images/category05.jpg";

const slides = [
  {
    image: cuisine01,
    title: "Lorem Ipsum 1 Test long title Test long title Test long title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: cuisine02,
    title: "Lorem Ipsum 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur test long description lorem ipsum test long description lorem ipsum blablabla.",
  },
  {
    image: cuisine03,
    title: "Lorem Ipsum 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: cuisine04,
    title: "Lorem Ipsum 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: cuisine05,
    title: "Lorem Ipsum 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const categories = [
  {
    image: category01,
    title: "Family Meals",
  },
  {
    image: category02,
    title: "Holiday Promos",
  },
  {
    image: category03,
    title: "Ala Carte",
  },
  {
    image: category04,
    title: "Milk Shakes",
  },
  {
    image: category05,
    title: "Beers and Wine",
  },
];

interface ContainerProps {}

const Details: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      {/* Restaurant info */}
      <Row className={`d-flex align-items-center ${styles.top}`}>
        <Col lg={{ span: 5 }}>
          <div className={`d-flex gap-2 ${styles.details}`}>
            <img className="img-fluid" src={restau01} />
            <div>
              <h3 className="mb-0">Chan’s Chinese Cuisine</h3>
              <p className="mb-0">
                What is the Chan’s Chinese cuisine? Asian Fusion uses
                traditional Asian-style ingredients, dishes and techniques to
                create innovative and flavorful new fusions. It is a cuisine
                style that typically combines Asian foods with the likes of
                traditional Mexican, American or other Asian-style dishes.
              </p>
            </div>
          </div>
        </Col>

        <Col lg={{ span: 4, offset: 3 }}>
          <div className={`d-flex flex-column gap-2 ${styles.buttons}`}>
            <Button className={styles.btnPromos}>
              Keep me updated on promos
            </Button>
            <Button className={styles.btnDiscounts}>
              Request for a Membership Discounts
            </Button>
          </div>
        </Col>
      </Row>

      {/* Menu slider */}
      <Row>
        <Col>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className={`d-none d-lg-block ${styles.sliderContainer}`}
          >
            {slides.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={styles.slideItem}>
                    <div className={styles.slideImageContainer}>
                      <img src={item.image} alt="" />
                    </div>
                    <div className={styles.slideContentContainer}>
                      <p className={styles.slideTitle}>{item.title}</p>
                      <p className={styles.slideDescription}>
                        {item.description}
                      </p>
                      <p className={styles.slidePrice}>423php</p>
                      <div
                        className={`d-flex justify-content-between ${styles.slideOptions}`}
                      >
                        <div
                          className={`d-flex justify-content-center align-items-center ${styles.qty}`}
                        >
                          <Button>
                            <Dash color="#61481C" size={18} />
                          </Button>
                          <span className={styles.num}>1</span>
                          <Button>
                            <Plus color="#61481C" size={18} />
                          </Button>
                        </div>
                        <div className={styles.addToCart}>
                          <Button>Add to cart</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      </Row>

      {/* Category filters */}
      <Row>
        <Col>
          <div className={`d-flex gap-4 ${styles.categories}`}>
            {categories.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`d-flex align-items-center ${styles.item}`}
                >
                  <div className={styles.imageContainer}>
                    <img src={item.image} />
                  </div>
                  <div
                    className={`d-flex justify-content-center align-items-center ${styles.title}`}
                  >
                    <h4>{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>

      {/* Ordered items & Checkout */}
      <div className={`d-flex align-items-center ${styles.bottom}`}>
        <div className={styles.cart}>Ordered items</div>

        <div className={styles.checkout}>
          <Row>
            {/* Checkout details */}
            <Col lg={{ span: 7 }}>
              <Row>
                <Col>
                  <span>Item count</span>
                </Col>
                <Col>
                  <strong>003</strong>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Sub-Total</span>
                </Col>
                <Col>
                  <strong>1,126php</strong>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Delivery fee</span>
                </Col>
                <Col>
                  <strong>86php</strong>
                </Col>
              </Row>
              <Row className={styles.total}>
                <Col>
                  <strong>Total</strong>
                </Col>
                <Col>
                  <strong>1,212php</strong>
                </Col>
              </Row>
            </Col>

            {/* Checkout buttons */}
            <Col
              lg={{ span: 4, offset: 1 }}
              className="d-flex flex-column justify-content-center"
            >
              <div className="d-flex flex-column gap-2">
                <Button className={styles.btnCheckout}>Checkout</Button>
                <Button className={styles.btnCancel}>Cancel Order</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Details;
