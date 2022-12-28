import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import styles from "./Details.module.scss";
import placeholder from "../../assets/images/placeholder.png";

import CategorySlider from "./CategorySlider";
import MenuSlider from "./MenuSlider";
import CartSlider from "./CartSlider";

interface ContainerProps {
  restaurant: TRestaurant | null;
  menu: TMenu[];
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
  quantity: number;
  flavor_price?: number;
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
  const navigate = useNavigate();

  const getItemCount = () => {
    const initialValue = 0;
    return cart.reduce((prev, cur) => prev + cur.quantity, initialValue);
  };

  const getSubtotal = () => {
    const initialValue = 0;
    return cart.reduce(
      // (prev, cur) => prev + cur.quantity * cur.price + (cur.flavor_price || 0),

      (prev, cur) =>
        prev + cur.quantity * (cur.price + (cur.flavor_price || 0)),

      // (prev, cur) => prev + cur.quantity * cur.price,
      initialValue
    );
  };

  const updateSummary = () => {
    setItemCount(getItemCount());
    setSubtotal(getSubtotal());
    setTotal(getSubtotal() + deliveryFee);
  };

  const handleCheckout = () => {
    const summaryDetails = {
      itemCount,
      subtotal,
      deliveryFee,
      total,
    };

    const checkout = {
      products: cart,
      summaryDetails,
      restaurant_id: restaurant?.id,
    };

    console.log("checkout", checkout);

    localStorage.setItem("checkout", JSON.stringify(checkout));
    navigate("/checkout");
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    updateSummary();
  }, [cart]);

  return (
    <div className={styles.container}>
      {/* Restaurant info */}
      <Row className={`d-flex align-items-center ${styles.top}`}>
        <Col
          lg={{ span: 7 }}
          md={{ span: 7, offset: 0 }}
          sm={{ span: 8, offset: 2 }}
        >
          <div className={`d-flex gap-2 ${styles.details}`}>
            <img
              className="img-fluid"
              src={
                restaurant
                  ? // ? process.env.REACT_APP_BASE_URL + restaurant.photo
                    restaurant.photo
                  : placeholder
              }
            />
            <div className={styles.textDetails}>
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
              <Button
                variant="primary"
                className={`d-md-none mt-2 ${styles.btnRating}`}
                onClick={() => navigate("feedback")}
              >
                Check ratings
              </Button>
            </div>
            <div>
              <Button
                variant="primary"
                className={`d-none d-md-block ${styles.btnRating}`}
                onClick={() => navigate("feedback")}
              >
                Check ratings
              </Button>
            </div>
          </div>
        </Col>

        <Col
          lg={{ span: 4, offset: 1 }}
          md={{ span: 5, offset: 0 }}
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
                <Button
                  className={styles.btnCheckout}
                  onClick={handleCheckout}
                  disabled={!cart.length}
                >
                  Check out
                </Button>
                <Button className={styles.btnCancel} onClick={handleCancel}>
                  Cancel Order
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Details;
