import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import styles from "./Details.module.scss";
import CategorySlider from "./CategorySlider";
import MenuSlider from "./MenuSlider";
import CartSlider from "./CartSlider";

// Sample static images
import cuisine01 from "../../assets/images/cuisine01.png";
import cuisine02 from "../../assets/images/cuisine02.png";
import cuisine03 from "../../assets/images/cuisine03.png";
import cuisine05 from "../../assets/images/cuisine05.png";
import cuisine07 from "../../assets/images/cuisine07.png";

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

interface ContainerProps {
  restaurant: TRestaurant | null;
  menu: TMenu[] | null;
  categories: TCategory[] | null;
}

type TRestaurant = {
  id: number;
  name: string;
  address: string;
  description: string;
  contact_number: string;
  landline: string;
  photo: string;
};

type TMenu = {
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
  qty: number;
};

type TCategory = {
  id: number;
  name: string;
  photo: string;
};

const Details: React.FC<ContainerProps> = ({
  restaurant,
  menu,
  categories,
}) => {
  const [cart, setCart] = useState<TCart[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(86);

  const getItemCount = () => {
    const initialValue = 0;
    return cart.reduce((prev, cur) => prev + cur.qty, initialValue);
  };

  const getSubtotal = () => {
    const initialValue = 0;
    return cart.reduce((prev, cur) => prev + cur.qty * cur.price, initialValue);
  };

  const updateSummary = () => {
    setItemCount(getItemCount());
    setSubtotal(getSubtotal());
    setTotal(getSubtotal() + deliveryFee);
  };

  useEffect(() => {
    updateSummary();
  }, [cart]);

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
            <img
              className="img-fluid"
              src={
                restaurant
                  ? process.env.REACT_APP_BASE_URL + restaurant.photo
                  : "https://via.placeholder.com/500"
              }
            />
            <div>
              <h3 className="mb-0">{restaurant?.name}</h3>
              <div className={`d-md-none ${styles.rating}`}>
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#E6B325" size={12} />
                <StarFill color="#D9D9D9" size={12} />
              </div>
              <p className="mb-1">{restaurant?.description}</p>
              <p className="mb-1">Address: {restaurant?.address}</p>
              <p className="mb-0">Contact #: {restaurant?.contact_number}</p>
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
          <MenuSlider slides={menu} setCart={setCart} />
        </Col>
      </Row>

      {/* Category filters */}
      <Row className={styles.categories}>
        <Col>
          <CategorySlider slides={categories} />
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
            {cart && cart.length ? (
              <CartSlider slides={cart} setCart={setCart} />
            ) : (
              <p>Cart is empty</p>
            )}
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
                  <strong>{itemCount}</strong>
                </Col>
              </Row>
              <Row className={styles.orderedAmountRow}>
                <Col>
                  <span>Sub-Total</span>
                </Col>
                <Col>
                  <strong>{subtotal} php</strong>
                </Col>
              </Row>
              <Row className={styles.orderedAmountRow}>
                <Col>
                  <span>Delivery fee</span>
                </Col>
                <Col>
                  <strong>{deliveryFee} php</strong>
                </Col>
              </Row>
              <Row className={styles.total}>
                <Col>
                  <strong>Total</strong>
                </Col>
                <Col>
                  <strong>{total} php</strong>
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
