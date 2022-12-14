import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import OrderSummary from "./OrderSummary";
import styles from "./CheckoutContainer.module.scss";
import DeliveryDetails from "./DeliveryDetails";
import BillDetails from "./BillDetails";
import ConfirmOrder from "./ConfirmOrder";
import NewAddress from "./NewAddress";
import Notes from "./Notes";

type TCart = {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
  flavor_price?: number;
};

type TSummaryDetails = {
  deliveryFee: number;
  itemCount: number;
  subtotal: number;
  total: number;
};

type TCheckout = {
  products: TCart[];
  restaurant_id: number;
  summaryDetails: TSummaryDetails;
};

interface ContainerProps {}

const CheckoutContainer: React.FC<ContainerProps> = ({}) => {
  const [cart, setCart] = useState<TCart[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(86);
  const [newAddress, setNewAddress] = useState("");
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [note, setNote] = useState("");
  const [localStorageObj, setLocalStorageObj] = useState<TCheckout>();
  const navigate = useNavigate();

  const getItemCount = () => {
    const initialValue = 0;
    return cart.reduce((prev, cur) => prev + cur.quantity, initialValue);
  };

  const getSubtotal = () => {
    const initialValue = 0;
    return cart.reduce(
      (prev, cur) => prev + cur.quantity * cur.price + (cur.flavor_price || 0),
      // (prev, cur) => prev + cur.quantity * cur.price,
      initialValue
    );
  };

  const updateSummary = () => {
    setItemCount(getItemCount());
    setSubtotal(getSubtotal());
    setTotal(getSubtotal() + deliveryFee);
  };

  useEffect(() => {
    // Get checkout details from localStorage
    let checkoutDetails = localStorage.getItem("checkout") || "";

    if (!checkoutDetails) navigate("/");
    else {
      let checkoutDetailsObj = JSON.parse(checkoutDetails);
      console.log("checkoutDetailsObj", checkoutDetailsObj);
      setLocalStorageObj(checkoutDetailsObj);
      setCart(checkoutDetailsObj.products);
    }
  }, []);

  useEffect(() => {
    if (localStorageObj) {
      updateSummary();

      // Prepare new checkout object
      const newCheckoutObj = {
        ...localStorageObj,
        products: cart,
        summaryDetails: {
          itemCount: getItemCount(),
          deliveryFee: deliveryFee,
          subtotal: getSubtotal(),
          total: getSubtotal() + deliveryFee,
        },
      };

      // Update state value
      setLocalStorageObj(newCheckoutObj);

      // Update local storage value
      localStorage.setItem("checkout", JSON.stringify(newCheckoutObj));
    }
  }, [cart]);

  // useEffect(() => {
  //   setNewAddress("");
  // }, [isNewAddress]);

  return (
    <Container fluid="md" className={styles.container}>
      <Row className={`mb-4 ${isNewAddress && "d-none"}`}>
        <Col>
          <DeliveryDetails
            cart={cart}
            restaurantId={localStorageObj?.restaurant_id}
            note={note}
            newAddress={newAddress}
            isNewAddress={isNewAddress}
            setIsNewAddress={setIsNewAddress}
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
          />
        </Col>
      </Row>

      <Row className={`mb-4 ${!isNewAddress && "d-none"}`}>
        <Col>
          <NewAddress
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            isNewAddress={isNewAddress}
            setIsNewAddress={setIsNewAddress}
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Notes note={note} setNote={setNote} />
        </Col>
      </Row>

      <Row className={styles.equalHeightColumns}>
        <Col lg={7} className="mb-4">
          <OrderSummary cart={cart} setCart={setCart} />
        </Col>
        <Col lg={5}>
          <BillDetails
            deliveryFee={deliveryFee}
            itemCount={itemCount}
            subtotal={subtotal}
            total={total}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <ConfirmOrder />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutContainer;
