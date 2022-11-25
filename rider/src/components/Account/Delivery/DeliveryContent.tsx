import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  Form,
  Collapse,
  Card,
} from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

import CloseButton from "react-bootstrap/CloseButton";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRiderOTW } from "../../../hooks/useRiderOTW";
import constants from "../../../utils/constants.json";

import "./DeliveryContent.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchIcon from "../../../assets/images/search.png";
import RiderIcon from "../../../assets/images/riderotw-icon.png";
import KitchenIcon from "../../../assets/images/kitchen-icon.png";
import OrderReceivedIcon from "../../../assets/images/order-received-icon.png";
import RewardsIcon from "../../../assets/images/rewards-icon.png";
import RewardsBtn from "../../../assets/images/rewardsBtn.png";
import RestoIcon from "../../../assets/images/resto.png";
import Delivery from "../../../pages/Account/Delivery";

interface ContainerProps {}

type ForDeliveryItem = {
  created_at: string;
  customer_id: string;
  customer_mobile: string;
  customer_name: string;
  order_address: string;
  order_email: string;
  order_mobile: string;
  order_status: string;
  otw_at: string;
  payment_type: string;
  plate_number: string;
  restaurant_name: string;
  restaurant_id: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: string;
  restaurant_photo: string;
};

type ForCompletedItem = {
  created_at: string;
  customer_id: string;
  customer_mobile: string;
  customer_name: string;
  order_address: string;
  order_email: string;
  order_mobile: string;
  order_status: string;
  otw_at: string;
  payment_type: string;
  plate_number: string;
  restaurant_name: string;
  restaurant_id: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
};

type ForCanceledItem = {
  created_at: string;
  customer_id: string;
  customer_mobile: string;
  customer_name: string;
  order_address: string;
  order_email: string;
  order_mobile: string;
  order_status: string;
  otw_at: string;
  payment_type: string;
  plate_number: string;
  restaurant_name: string;
  restaurant_id: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  restaurant_photo: string;
};

const DeliveryContent: React.FC<ContainerProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const navigateToHistory = () => {
    navigate("/account/order-history");
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);

  const [open, setOpen] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [show, setShow] = useState(true);

  //View Details = Close Button
  const changeState = () => {
    setShow(!show);
  };

  const handleClick = (e: any) => {
    setIsShown((current) => !current);
  };

  const {
    getForDelivery,
    getForDeliveryOTW,
    getOrderCompleted,
    getOrderCanceled,
  } = useRiderOTW();

  const { otw } = useParams();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const [forOrderCompleted, setForOrderCompleted] = useState<
    ForCompletedItem[]
  >([]);

  const [forOrderCanceled, setForOrderCanceled] = useState<ForCanceledItem[]>(
    []
  );

  //Original
  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

  //Temporary
  // const loadOrderForDelivery = async (status: string) => {
  //   const params = { paginate: 49, status: status };
  //   const response = await getForDeliveryOTW(params);
  //   console.log("getForDelivery", response);
  //   setForDelivery(response.data);
  //   console.log(response.data);
  // };

  const loadOrderCompleted = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCompleted(params);
    console.log("getOrderCompleted", response);
    setForOrderCompleted(response.data);
  };

  const loadOrderCanceled = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCanceled(params);
    console.log("getOrderCanceled", response);
    setForOrderCanceled(response.data);
  };

  useEffect(() => {
    // handleGetForDelivery();
    loadOrderForDelivery("preparing");
    // loadOrderForDelivery("pending");
    loadOrderCompleted("delivered");
    loadOrderCanceled("canceled");
  }, []);

  function CustomToggle({ children, eventKey }: any) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      handleClick(eventKey)
    );

    return (
      <button
        style={{
          backgroundColor: "#a47e3b",
          border: "none",
          color: "white",
          fontWeight: "600",
          fontSize: "12px",
          lineHeight: "8px",
          width: "208px",
          height: "26px",
          textTransform: "uppercase",
        }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  function CustomToggle2({ children, eventKey }: any) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      handleClick(eventKey)
    );

    return (
      <button
        style={{
          backgroundColor: "#e6b325",
          border: "none",
          color: "white",
          fontWeight: "700",
          fontSize: "8px",
          lineHeight: "8px",
          width: "82px",
          height: "26px",
          textTransform: "uppercase",
        }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  function CompletedModal(props: any) {
    return (
      <Modal {...props} size="lg" aria-labelledby="">
        <Modal.Header closeButton className="px-4">
          <Modal.Title id="" className="ms-auto">
            COMPLETED
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {forOrderCompleted.map((item, index) => {
            return (
              <Container
                className="order-delivery-container d-flex flex-column gap-2"
                fluid
                key={index}
              >
                <Row className="mx-md-3">
                  <Col xs={3} md={2} className="d-flex flex-column gap-1">
                    <div className="order-id">
                      <p>ORDER ID: {item.customer_id}</p>
                    </div>
                    <div className="order-items">
                      <ul aria-label="Order Items">
                        <li>Ramen Noodles(3x)</li>
                        <li>Milk Tea(2x)</li>
                        <li>1 Water Melon</li>
                        <li>1 Boba Soya</li>
                        <li>Pecking Duck (1x)</li>
                      </ul>
                    </div>
                    <div className="delivery-fee">
                      <p>
                        Delivery Fee <br />
                        <span>₱{item.rider_id}.00</span>
                      </p>
                    </div>
                    <div className="grand-total">
                      <p>
                        Grand Total <br />
                        <span>₱{item.rider_vehicle_model}.00</span>
                      </p>
                    </div>
                  </Col>
                  <Col xs={8} md={4}>
                    <div className="customer-info">
                      <li>
                        Customer Name: <span> {item.customer_name}</span>
                      </li>
                      <li>
                        Contact Number: <span> {item.customer_mobile}</span>
                      </li>
                      <li>
                        Pick up Address :<span> {item.restaurant_name}</span>
                      </li>
                      <li>
                        Delivery Address:
                        <span> {item.order_address}</span>
                      </li>
                      <li>
                        Order Placed Time: <span> {item.created_at}</span>
                      </li>
                      <li>
                        Order Status: <span> {item.order_status}</span>
                        <img src={OrderReceivedIcon} />
                      </li>

                      <div className="decline-accept">
                        <a>Decline</a>
                        <a>Accept</a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          {/* <button onClick={props.onHide}>Close</button> */}
        </Modal.Footer>
      </Modal>
    );
  }

  function CancelledModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="px-4">
          <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
            CANCELLED
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {forOrderCanceled.map((item, index) => {
            return (
              <Container
                className="order-delivery-container d-flex flex-column gap-3"
                fluid
                key={index}
              >
                <Row className="mx-md-3">
                  <Col xs={3} md={2} className="d-flex flex-column gap-1">
                    <div className="order-id">
                      <p>ORDER ID: {item.customer_id}</p>
                    </div>
                    <div className="order-items">
                      <ul aria-label="Order Items">
                        <li>Ramen Noodles(3x)</li>
                        <li>Milk Tea(2x)</li>
                        <li>1 Water Melon</li>
                        <li>1 Boba Soya</li>
                        <li>Pecking Duck (1x)</li>
                      </ul>
                    </div>
                    <div className="delivery-fee">
                      <p>
                        Delivery Fee <br />
                        <span>85 php</span>
                      </p>
                    </div>
                    <div className="grand-total">
                      <p>
                        Grand Total <br />
                        <span>1,350 php</span>
                      </p>
                    </div>
                  </Col>
                  <Col xs={8} md={4}>
                    <div className="customer-info">
                      <li>
                        Customer Name: <span> {item.customer_name}</span>
                      </li>
                      <li>
                        Contact Number: <span> {item.customer_mobile}</span>
                      </li>
                      <li>
                        Pick up Address :<span> {item.restaurant_name}</span>
                      </li>
                      <li>
                        Delivery Address:
                        <span> {item.order_address}</span>
                      </li>
                      <li>
                        Order Placed Time: <span> {item.created_at}</span>
                      </li>
                      <li>
                        Order Status: <span> {item.order_status}</span>
                        <img src={OrderReceivedIcon} />
                      </li>

                      <div className="decline-accept">
                        <a>Decline</a>
                        <a>Accept</a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          {/* <button onClick={props.onHide}>Close</button> */}
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="deliveryContainer">
      <div className="tableContainerHistory">
        <div className="tableHeader">
          <div className="tableHeader1">
            <h3>For Delivery</h3>
            {/* <div className="search">
              <input type="text" placeholder="Search order ID" />
              <img src={SearchIcon} alt="" />
            </div> */}
          </div>
        </div>
      </div>
      {forDelivery.map((item, index) => {
        return (
          <Accordion className="test" flush key={index}>
            <Accordion.Item eventKey={item.id}>
              <div className="orderDiv">
                <CustomToggle eventKey={item.id}>
                  {/* <Button className="orderIdBtn">Order ID : {item.id}</Button>
                <Button className="viewDetailsBtn">View Details</Button> */}
                  Order ID: {item.id}
                </CustomToggle>
                <div className="d-md-none">
                  <CustomToggle2 eventKey={item.id}>View Details</CustomToggle2>
                </div>
              </div>
              <Accordion.Body className="deliveryDetails2">
                <div>
                  <Row>
                    <Col>
                      <p>
                        Customer Name: <span>{item.customer_name}</span>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Contact Number: <span>0917 123 4567 {item.id} </span>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <p>
                      Pick-up address:
                      <span>
                        Chan’s Chinese Restaurant, Panglao, Bohol, Philippines
                      </span>
                    </p>
                  </Row>
                  <Row>
                    <p>
                      Delivery Address:
                      <span>
                        4117 41st Floor., GT Tower Intl., De La Costa, Makati
                        City
                      </span>
                    </p>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        Order Placed Time: <span>01:30 pm</span>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Order Delivered Time: <span>01:30 pm</span>
                      </p>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <p>
                        Order Details:
                        <li>Ramen Noodles</li>
                        <li>Milk Tea(2x)</li>
                        <li>1 Watermelon</li>
                        <li>1 Boba Soya</li>
                        <li>Peking Duck (1x)</li>
                      </p>
                    </Col>
                    <Col>
                      <div className="resto">
                        <p>Chan's Restaurant</p>
                        <img src={RestoIcon} alt="resto" />
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <p>
                        Sub Total: <span>1,350 php</span>
                      </p>
                      <p>
                        Delivery Fee: <span>85 php</span>
                      </p>
                      <p>
                        Total: <span>1,435 php</span>
                      </p>
                    </Col>
                    <Col>
                      <div className="status">
                        <p>Order Status</p>
                        <img src={OrderReceivedIcon} />
                        <span>Order Received</span>
                      </div>
                    </Col>
                  </Row>
                  <div className="declineAccept">
                    {/* <button>Decline</button> */}
                    <Link to={`/account/for-delivery/order/${item.id}`}>
                      <button>Accept</button>
                    </Link>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Row className="forDeliveryMobile">
              <Col
                xs={1}
                className="deliveryDetails d-md-none"
                style={{ display: isShown ? "block" : "none" }}
              >
                <Row>
                  <Col>
                    <p>
                      Customer Name: <span> {item.customer_name} </span>
                    </p>
                  </Col>
                  <Col>
                    <p>
                      Contact Number: <span>0917 123 4567</span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <p>
                    Pick-up address:
                    <span>
                      Chan’s Chinese Restaurant, Panglao, Bohol, Philippines
                    </span>
                  </p>
                </Row>
                <Row>
                  <p>
                    Delivery Address:
                    <span>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati City
                    </span>
                  </p>
                </Row>
                <Row>
                  <Col>
                    <p>
                      Order Placed Time: <span>01:30 pm</span>
                    </p>
                  </Col>
                  <Col>
                    <p>
                      Order Delivered Time: <span>01:30 pm</span>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="forDeliveryDesktop d-none d-md-block">
              <Col
                className="deliveryDetails"
                style={{ display: isShown ? "block" : "none" }}
              >
                <Row className="p-1">
                  <Col>
                    <p>
                      Customer Name: <span>Brandon Boyd</span>
                    </p>
                  </Col>
                  <Col>
                    <p>
                      Contact Number: <span>0917 123 4567</span>
                    </p>
                  </Col>
                </Row>
                <Row className="p-1">
                  <p>
                    Pick-up address:
                    <span>
                      Chan’s Chinese Restaurant, Panglao, Bohol, Philippines
                    </span>
                  </p>
                </Row>
                <Row className="p-1">
                  <p>
                    Delivery Address:
                    <span>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati City
                    </span>
                  </p>
                </Row>
                <Row className="p-1">
                  <Col>
                    <p>
                      Order Placed Time: <span>01:30 pm</span>
                    </p>
                  </Col>
                  <Col>
                    <p>
                      Order Delivered Time: <span>01:30 pm</span>
                    </p>
                  </Col>

                  {/* <Row>
                    <Col md={{ span: 4, offset: 5 }}>
                      <Button
                        className="detailsBtn"
                        onClick={(event) => {
                          handleClick(event);
                          setOpen(!open);
                          changeState();
                        }}
                        style={{ display: isShown ? "block" : "none" }}
                      >
                        View Details
                      </Button>
                    </Col>
                  </Row> */}
                </Row>

                <Row>
                  <Col
                    className="d-none d-md-block"
                    md={{ span: 7, offset: 5 }}
                  >
                    <CustomToggle2 eventKey={item.id}>
                      View Details
                    </CustomToggle2>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Accordion>
        );
      })}

      {/* <div className={styles.bottomButtons}>
        <button onClick={navigateToHistory}>History</button>
        
        <button onClick={() => setModalShow1(true)}>Completed</button>
        <CompletedModal show={modalShow1} onHide={() => setModalShow1(false)} />
        <button onClick={() => setModalShow2(true)}>Cancelled</button>
        <CancelledModal show={modalShow2} onHide={() => setModalShow2(false)} />
      </div> */}
      <div className="rewardsContainer">
        <div className="rewardsButton">
          <a href="/account/rewards">
            <img src={RewardsBtn} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeliveryContent;
