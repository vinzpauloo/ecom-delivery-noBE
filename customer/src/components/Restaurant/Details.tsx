import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import styles from "./Details.module.scss";
import CategorySlider from "./CategorySlider";

// Sample static images
import restau01 from "../../assets/images/restau01.png";
import cuisine01 from "../../assets/images/cuisine01.png";
import cuisine02 from "../../assets/images/cuisine02.png";
import cuisine03 from "../../assets/images/cuisine03.png";
import cuisine04 from "../../assets/images/cuisine04.png";
import cuisine05 from "../../assets/images/cuisine05.png";
import cuisine06 from "../../assets/images/cuisine06.png";
import cuisine07 from "../../assets/images/cuisine07.png";
import category01 from "../../assets/images/category01.jpg";
import category02 from "../../assets/images/category02.jpg";
import category03 from "../../assets/images/category03.jpg";
import category04 from "../../assets/images/category04.jpg";
import category05 from "../../assets/images/category05.jpg";
import category06 from "../../assets/images/category06.jpg";
import MenuSlider from "./MenuSlider";
import CartSlider from "./CartSlider";

const menuSlides = [
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
  {
    image: cuisine06,
    title: "Lorem Ipsum 6",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: cuisine07,
    title: "Lorem Ipsum 7",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const categoriesSlides = [
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
  {
    image: category06,
    title: "Others",
  },
];

const cartSlides = [
  {
    image: cuisine02,
    price: 100,
    qty: 1,
  },
  {
    image: cuisine03,
    price: 400,
    qty: 3,
  },
  {
    image: cuisine01,
    price: 700,
    qty: 5,
  },
  {
    image: cuisine05,
    price: 300,
    qty: 4,
  },
  {
    image: cuisine07,
    price: 900,
    qty: 7,
  },
];

interface ContainerProps {}

const Details: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      {/* Restaurant info */}
      <Row className={`d-flex align-items-center ${styles.top}`}>
        <Col
          lg={{ span: 5 }}
          md={{ span: 6, offset: 0 }}
          sm={{ span: 8, offset: 2 }}
        >
          <div className={`d-flex gap-2 ${styles.details}`}>
            <img className="img-fluid" src={restau01} />
            <div>
              <h3 className="mb-0">Chan’s Chinese Cuisine</h3>
              <div className={`d-md-none ${styles.rating}`}>
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#D9D9D9" size={12} />
              </div>
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

        <Col
          lg={{ span: 4, offset: 3 }}
          md={{ span: 5, offset: 1 }}
          className="d-none d-md-block"
        >
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
      <Row className={styles.menu}>
        <Col>
          <MenuSlider slides={menuSlides} />
        </Col>
      </Row>

      {/* Category filters */}
      <Row className={styles.categories}>
        <Col>
          <CategorySlider slides={categoriesSlides} />
        </Col>
      </Row>

      {/* Mobile: Promo Buttons */}
      <Row className={`d-md-none ${styles.buttonsContainer}`}>
        <Col>
          <div className={`d-flex mx-2 mb-3 gap-2 ${styles.buttons}`}>
            <Button className={styles.btnDiscounts}>
              Get voucher | Promo code
            </Button>
            <Button className={styles.btnPromos}>
              Keep me updated on promos
            </Button>
          </div>
        </Col>
      </Row>

      {/* Ordered items & Checkout */}
      <div className={`d-flex align-items-center ${styles.bottom}`}>
        {/* Ordered items */}
        <div
          className={`d-flex flex-column justify-content-center ${styles.cart}`}
        >
          <h5>Ordered Items</h5>

          <div>
            <CartSlider slides={cartSlides} />
          </div>
        </div>

        <div
          className={`d-flex flex-column justify-content-center ${styles.checkout}`}
        >
          <h5 className="d-md-none">Ordered Amount</h5>
          <Row>
            {/* Checkout details */}
            <Col md={{ span: 7 }}>
              <Row className={styles.orderedAmountRow}>
                <Col>
                  <span>Item count</span>
                </Col>
                <Col>
                  <strong>003</strong>
                </Col>
              </Row>
              <Row className={styles.orderedAmountRow}>
                <Col>
                  <span>Sub-Total</span>
                </Col>
                <Col>
                  <strong>1,126 php</strong>
                </Col>
              </Row>
              <Row className={styles.orderedAmountRow}>
                <Col>
                  <span>Delivery fee</span>
                </Col>
                <Col>
                  <strong>86 php</strong>
                </Col>
              </Row>
              <Row className={styles.total}>
                <Col>
                  <strong>Total</strong>
                </Col>
                <Col>
                  <strong>1,212 php</strong>
                </Col>
              </Row>
            </Col>

            {/* Checkout buttons */}
            <Col
              md={{ span: 4, offset: 1 }}
              className="d-flex flex-column justify-content-center"
            >
              <div className="d-flex flex-md-column gap-2">
                <Link to="/checkout" className={styles.btnCheckout}>
                  Checkout
                </Link>
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
