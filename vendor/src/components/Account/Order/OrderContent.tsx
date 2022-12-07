import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  Form,
  Collapse,
  Card,
  Modal,
} from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useGetOrderStatus } from "../../../hooks/useGetOrderStatus";
import { useOrder } from "../../../hooks/useOrder";

import searchIcon from "../../../assets/images/searchIcon.png";
import orderReceived from "../../../assets/images/order-received.png";
import kitchenPrep from "../../../assets/images/kitchen-prep.png";
import riderOTW from "../../../assets/images/rider-on-the-way.png";
import riderDelivered from "../../../assets/images/delivered.png";

import {getDate, getTime} from "../../../utils/formatDate";

import styles from "./OrderContent.module.scss";

interface ContainerProps {}

type TOrder = {
  id: number;
  created_at: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  order_address: string;
  order_status: string;
  order_mobile: number;
  restaurant_address: string;
  restaurant_name: string;
  restaurant_photo: string;
  products: [{ name: string; quantity: number }];
  total_amount: number;
};

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
  restaurant_address: string;
  total_amount: number;
};

type ForOtwItem = {
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
  restaurant_address: string;
  total_amount: number;
};

type GetDeliveredItem = {
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
  rider_name: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: number;
};

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const [order, setOrder] = useState<TOrder>();
  const [productItem, setProductItem] = useState<TOrder>();

  const {
    getCurrentOrder,
    getForDeliveryOTW,
    getOrderCompleted,
    getOrderCanceled,
  } = useGetOrderStatus();

  const { updateOrder, cancelOrder, getOrdersById } = useOrder();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);
  const [forOtw, setForOtw] = useState<ForOtwItem[]>([]);
  const [status, setStatus] = useState<ForDeliveryItem>();
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [deliveredItem, setDeliveredItem] = useState<GetDeliveredItem[]>([]);
  const [search, setSearch] = useState("");

  const [isShown, setIsShown] = useState(true);
  const [show, setShow] = useState(true);

  const loadPendingOrder = async (status: string) => {
    const params = { status: status };
    const response = await getCurrentOrder(params);
    console.log("getForDelivery", response);
    setForDelivery(response.data);
    console.log(response.data);
  };

  const navigate = useNavigate();

  // Get the params from the url
  const { id } = useParams();

  const loadOrder = async () => {
    const response = await getOrdersById(id);
    console.log("getOrdersById response", response);
    setOrder(response);
  };

  const handleCancel = async (id: any) => {
    const response = await cancelOrder(id, "cancel");
    alert("declined order");
    window.location.reload();
    navigate("/account/for-delivery");
  };

  const handleAccept = async (id: string) => {
    console.log(id);
    const response = await updateOrder(id, "received");
    console.log(response);
    alert("You have accepted this order");
    navigate(`/account/order/status/${id}`);
  };

  const handleClick = (e: any) => {
    setIsShown((current) => !current);
  };

  const loadDeliveredItem = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCompleted(params);
    console.log("getOrderCompleted", response);
    setDeliveredItem(response.data);
  };

  function CustomToggle({ children, eventKey }: any) {
    const handleClickItem = async (props) => {
      const response = await getOrdersById(props);
      console.log("getOrdersById response", response);
      setProductItem(response);
    };

    const decoratedOnClick = useAccordionButton(eventKey, () =>{
        handleClick(eventKey)
        handleClickItem(eventKey)
      }
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

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    console.log("getForDelivery", response);
    setForOtw(response.data);
  };

  useEffect(() => {
    loadPendingOrder("pending");
    loadOrderForDelivery("preparing, otw");
    loadDeliveredItem("delivered");
    loadOrder();
  }, []);

  const handleClickItem = async (props) => {
    const response = await getOrdersById(props);
    console.log("getOrdersById response", response);
    setProductItem(response);
  };

  const handleClickComplete = (id) => {
    navigate("completed/" + id);
  };
  const handleClickCancel = (id) => {
    console.log("ajajaj");
    navigate("cancelled/" + id);
  };

  function CompletedModal(props: any) {
    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-none d-lg-block"
        >
          <Modal.Body className={`${styles.modalBody} p-0`}>
            <Container>
              <Row className={styles.modalHeaderContent}>
                <Col className={styles.modalHeader}>Order ID</Col>
                <Col className={styles.modalHeader}>Date</Col>
                <Col className={styles.modalHeader}>Order Placed Time</Col>
                <Col className={styles.modalHeader}>Order Delivered</Col>
                <Col className={styles.modalHeader}>Rider Name</Col>
              </Row>
            </Container>
            {deliveredItem?.map((item, index) => {
              return (
                <Container
                  className={`${styles.orderDeliveryContainer} d-flex flex-column gap-2`}
                  // className="order-delivery-container d-flex flex-column gap-2"
                  fluid
                  key={index}
                >
                  <Row
                    className={styles.modalRow}
                    onClick={() => handleClickComplete(item.id)}
                  >
                    <Col className={styles.modalHeader}>{item.id}</Col>
                    <Col className={styles.modalHeader}>
                      {item.created_at.slice(0, 10)}
                    </Col>
                    <Col className={styles.modalHeader}>
                      {item.created_at.slice(12, 19)}
                    </Col>
                    <Col className={styles.modalHeader}>
                      {item.updated_at.slice(0, 10)}
                    </Col>
                    <Col className={styles.modalHeader}>{item.rider_name}</Col>
                  </Row>
                </Container>
              );
            })}
          </Modal.Body>
        </Modal>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-lg-none"
        >
          <h4>Completed</h4>
          <Modal.Body className={`${styles.modalBody} p-0`}>
            {deliveredItem?.map((item, index) => {
              return (
                <Container
                  className={styles.orderDeliveryContainer}
                  fluid
                  key={index}
                >
                  <Row
                    className={styles.contentContainer}
                    onClick={() => handleClickComplete(item.id)}
                  >
                    <Col className={`col-3 ${styles.idContent}`}>
                      <Row>
                        <Col className={styles.modalHeader}>Order ID</Col>
                      </Row>
                      <Row>
                        <Col className={styles.modalHeaderLabel}>{item.id}</Col>
                      </Row>
                    </Col>
                    <Col className="col-9">
                      <Row className={styles.row}>
                        <Col>
                          <Row className={styles.lable}>Date</Row>
                          <Row className={styles.lable}>
                            {item.created_at.slice(0, 10)}
                          </Row>
                        </Col>
                        <Col>
                          <Row className={styles.lable}>Order Placed Time</Row>
                          <Row className={styles.lable}>
                            {item.created_at.slice(12, 19)}
                          </Row>
                        </Col>
                      </Row>
                      <Row className={styles.row}>
                        <Col>
                          <Row className={styles.lable}>Rider Name</Row>
                          <Row className={styles.lable}>{item.rider_name}</Row>
                        </Col>
                        <Col>
                          <Row className={styles.lable}>Order Delivered</Row>
                          <Row className={styles.lable}>
                            {item.updated_at.slice(0, 10)}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              );
            })}
          </Modal.Body>
        </Modal>
      </>
    );
  }

  function CancelledModal(props: any) {
    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-none d-lg-block"
        >
          <Modal.Body className={`${styles.modalBody} p-0`}>
            <Container>
              <Row className={styles.modalHeaderContent}>
                <Col className={styles.modalHeader}>Order ID</Col>
                <Col className={styles.modalHeader}>Date</Col>
                <Col className={styles.modalHeader}>Order Placed Time</Col>
                <Col className={styles.modalHeader}>Time Cancelled</Col>
                <Col className={styles.modalHeader}>Rider Name</Col>
              </Row>
            </Container>
            {deliveredItem?.map((item, index) => {
              return (
                <Container
                  className={`${styles.orderDeliveryContainer} d-flex flex-column gap-2`}
                  // className="order-delivery-container d-flex flex-column gap-2"
                  fluid
                  key={index}
                >
                  <Row
                    className={styles.modalRow}
                    onClick={() => handleClickCancel(item.id)}
                  >
                    <Col className={styles.modalHeader}>{item.id}</Col>
                    <Col className={styles.modalHeader}>
                      {item.created_at.slice(0, 10)}
                    </Col>
                    <Col className={styles.modalHeader}>
                      {item.created_at.slice(12, 19)}
                    </Col>
                    <Col className={styles.modalHeader}>
                      {item.updated_at.slice(0, 10)}
                    </Col>
                    <Col className={styles.modalHeader}>{item.rider_name}</Col>
                  </Row>
                </Container>
              );
            })}
          </Modal.Body>
        </Modal>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-lg-none"
        >
          <h4>Cancelled</h4>
          <Modal.Body className={`${styles.modalBody} p-0`}>
            {deliveredItem?.map((item, index) => {
              return (
                <Container
                  className={styles.orderDeliveryContainer}
                  fluid
                  key={index}
                >
                  <Row
                    className={styles.contentContainer}
                    onClick={() => handleClickCancel(item.id)}
                  >
                    <Col className={`col-3 ${styles.idContent}`}>
                      <Row>
                        <Col className={styles.modalHeader}>Order ID</Col>
                      </Row>
                      <Row>
                        <Col className={styles.modalHeaderLabel}>{item.id}</Col>
                      </Row>
                    </Col>
                    <Col className="col-9">
                      <Row className={styles.row}>
                        <Col>
                          <Row className={styles.lable}>Date</Row>
                          <Row className={styles.lable}>
                            {item.created_at.slice(0, 10)}
                          </Row>
                        </Col>
                        <Col>
                          <Row className={styles.lable}>Order Placed Time</Row>
                          <Row className={styles.lable}>
                            {item.created_at.slice(12, 19)}
                          </Row>
                        </Col>
                      </Row>
                      <Row className={styles.row}>
                        <Col>
                          <Row className={styles.lable}>Rider Name</Row>
                          <Row className={styles.lable}>{item.rider_name}</Row>
                        </Col>
                        <Col>
                          <Row className={styles.lable}>Order Delivered</Row>
                          <Row className={styles.lable}>
                            {item.updated_at.slice(0, 10)}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              );
            })}
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className={styles.deliveryContainer}>
        <div className={styles.tableContainerHistory}>
          <div className={`${styles.tableHeader} d-none d-lg-block`}>
            <Row className={`${styles.tableHeader1} w-100`}>
              <Col className={`${styles.headerH3}`}>
                <h3>For Delivery (Current Orders)</h3>
              </Col>
            </Row>
            <Row className="w-100">
              <Col className={`${styles.searchInput} search col-6`}>
                <input
                  type="text"
                  placeholder="Search order ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <img className={styles.searchIcon} src={searchIcon} alt="" />
              </Col>
              <Col className={styles.buttonContent}>
                <Row>
                  <Col className="col-6">
                    <Button
                      onClick={() => setModalShow1(true)}
                      className={styles.buttons}
                    >
                      Completed
                    </Button>
                    <CompletedModal
                      show={modalShow1}
                      onHide={() => setModalShow1(false)}
                    />
                  </Col>
                  <Col className="col-6">
                    <Button
                      onClick={() => setModalShow2(true)}
                      className={styles.buttons}
                    >
                      Cancelled
                    </Button>
                    <CancelledModal
                      show={modalShow2}
                      onHide={() => setModalShow2(false)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className={`${styles.mobileHeader} d-lg-none`}>
            <Row>
              <Col className={`${styles.headerH3}`}>
                <h3>For Delivery</h3>
              </Col>
              <Col className={`${styles.searchInput} search`}>
                <input
                  type="text"
                  placeholder="Search order ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <img className={styles.searchIcon} src={searchIcon} alt="" />
              </Col>
            </Row>
          </div>
        </div>
        {/* Received Orders from Customer start */}
        {search !== ""
          ? forDelivery
              ?.filter((item) =>
                item.id
                  .toString()
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .map((item, index) => {
                return (
                  <Accordion className={styles.test} flush key={index}>
                    <Accordion.Item eventKey={item.id}>
                      <div className={styles.orderDiv}>
                        <CustomToggle eventKey={item.id}>
                          {/* <Button className="orderIdBtn">Order ID : {item.id}</Button>
                    <Button className="viewDetailsBtn">View Details</Button> */}
                          Order ID: {item.id}
                        </CustomToggle>
                        <div
                          className="d-md-none"
                          onClick={() => handleClickItem(item.id)}
                        >
                          <CustomToggle2 eventKey={item.id}>
                            View Details
                          </CustomToggle2>
                        </div>
                      </div>
                      <Accordion.Body className={styles.deliveryDetails2}>
                        <div>
                          <Row>
                            <Col>
                              <p>
                                Customer Name: <span>{item.customer_name}</span>
                              </p>
                            </Col>
                            <Col>
                              <p>
                                Contact Number:{" "}
                                <span>{item.customer_mobile}</span>
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <p>
                              Pick-up address:
                              <span>
                                {item.restaurant_address}
                              </span>
                            </p>
                          </Row>
                          <Row>
                            <p>
                              Delivery Address:
                              <span>
                                {item.order_address}
                              </span>
                            </p>
                          </Row>
                          <Row>
                            <Col>
                              <p>
                                Order Placed Time: <span>{getTime(item.created_at)}</span>
                              </p>
                            </Col>
                            <Col>
                              <p>
                                Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                              </p>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col>
                              <p>Order Details:</p>
                              <ul>
                                {productItem?.products.map((item,index) => (
                                  <li key={index}>
                                    {item.quantity}x {item.name}
                                  </li>
                                ))}
                              </ul>
                            </Col>
                            <Col>
                              <div className={styles.resto}>
                                <p>{item.restaurant_name}</p>
                                <img
                                  src={productItem?.restaurant_photo}
                                  alt="resto"
                                />
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
                              <div className={styles.status}>
                                <p>Order Status</p>
                                {/* <img src={OrderReceivedIcon} /> */}
                                {/* <span>{item.order_status}</span> */}
                                {item?.order_status === "pending" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={orderReceived} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Pending
                                    </p>
                                  </div>
                                )}
                                {item?.order_status === "preparing" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={kitchenPrep} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Kitchen Preparing...
                                    </p>
                                  </div>
                                )}
                                {item?.order_status === "otw" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={riderOTW} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Rider On Its Way
                                    </p>
                                  </div>
                                )}
                                {item?.order_status === "delivered" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={riderDelivered} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Order Delivered
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <div className={styles.declineAccept}>
                            {
                              item?.order_status === "pending" ? (
                              <Button onClick={() => handleAccept(item.id)}>
                                Accept
                              </Button>
                              ) : null
                            }
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Row className={styles.forDeliveryMobile}>
                      <Col
                        xs={1}
                        className={`${styles.deliveryDetails} d-md-none`}
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
                              Contact Number: <span>{item.customer_mobile}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <p>
                            Pick-up address:
                            <span>
                              {item.restaurant_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <p>
                            Delivery Address:
                            <span>
                              {item.order_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                              Order Placed Time: <span>{getTime(item.created_at)}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row
                      className={`${styles.forDeliveryDesktop} d-none d-md-block`}
                    >
                      <Col
                        className={styles.deliveryDetails}
                        style={{ display: isShown ? "block" : "none" }}
                      >
                        <Row className="p-1">
                          <Col>
                            <p>
                              Customer Name: <span>{item.customer_name}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Contact Number: <span>{item.customer_mobile}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row className="p-1">
                          <p>
                            Pick-up address:
                            <span>
                              {item.restaurant_address}
                            </span>
                          </p>
                        </Row>
                        <Row className="p-1">
                          <p>
                            Delivery Address:
                            <span>
                              {item.order_address}
                            </span>
                          </p>
                        </Row>
                        <Row className="p-1">
                          <Col>
                            <p>
                              Order Placed Time: <span>{item.created_at}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Order Delivered Time: <span>{item.updated_at}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            className="d-none d-md-block"
                            md={{ span: 7, offset: 5 }}
                            onClick={() => handleClickItem(item.id)}
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
              })
          : forDelivery?.map((item, index) => {
              return (
                <Accordion className={styles.test} flush key={index}>
                  <Accordion.Item eventKey={item.id}>
                    <div className={styles.orderDiv}>
                      <CustomToggle eventKey={item.id} >
                        Order ID: {item.id}
                      </CustomToggle>
                      <div
                        className="d-md-none"
                        onClick={() => handleClickItem(item.id)}
                      >
                        <CustomToggle2 eventKey={item.id}>
                          View Details
                        </CustomToggle2>
                      </div>
                    </div>
                    <Accordion.Body className={styles.deliveryDetails2}>
                      <div>
                        <Row>
                          <Col>
                            <p>
                              Customer Name: <span>{item.customer_name}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Contact Number:{" "}
                              <span>{item.customer_mobile}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <p>
                            Pick-up address:
                            <span>
                              {item.restaurant_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <p>
                            Delivery Address:
                            <span>
                              {item.order_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                              Order Placed Time: <span>{getTime(item.created_at)}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                            </p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <p>Order Details:</p>
                            <ul>
                              {productItem?.products.map((item, index) => (
                                <li key={index}>
                                  {item.quantity}x {item.name}
                                </li>
                              ))}
                            </ul>
                          </Col>
                          <Col>
                            <div className={styles.resto}>
                              <p>{item.restaurant_name}</p>
                              <img
                                src={productItem?.restaurant_photo}
                                alt="resto"
                              />
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
                            <div className={styles.status}>
                              <p>Order Status</p>
                              {/* <img src={OrderReceivedIcon} /> */}
                              {/* <span>{item.order_status}</span> */}
                              {item?.order_status === "pending" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={orderReceived} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Pending
                                  </p>
                                </div>
                              )}
                              {item?.order_status === "preparing" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={kitchenPrep} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Kitchen Preparing...
                                  </p>
                                </div>
                              )}
                              {item?.order_status === "otw" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={riderOTW} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Rider On Its Way
                                  </p>
                                </div>
                              )}
                              {item?.order_status === "delivered" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={riderDelivered} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Order Delivered
                                  </p>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <div className={styles.declineAccept}>
                          {
                            item?.order_status === "pending" ? (
                            <Button onClick={() => handleAccept(item.id)}>
                              Accept
                            </Button>
                            ) : null
                          }
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Row className={styles.forDeliveryMobile}>
                    <Col
                      xs={1}
                      className={`${styles.deliveryDetails} d-md-none`}
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
                            Contact Number: <span>{item.customer_mobile}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          Pick-up address:
                          <span>
                            {item.restaurant_address}
                          </span>
                        </p>
                      </Row>
                      <Row>
                        <p>
                          Delivery Address:
                          <span>
                            {item.order_address}
                          </span>
                        </p>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            Order Placed Time: <span>{getTime(item.created_at)}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    className={`${styles.forDeliveryDesktop} d-none d-md-block`}
                  >
                    <Col
                      className={styles.deliveryDetails}
                      style={{ display: isShown ? "block" : "none" }}
                    >
                      <Row className="p-1">
                        <Col>
                          <p>
                            Customer Name: <span>{item.customer_name}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Contact Number: <span>{item.customer_mobile}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row className="p-1">
                        <p>
                          Pick-up address:
                          <span>
                            {item.restaurant_address}
                          </span>
                        </p>
                      </Row>
                      <Row className="p-1">
                        <p>
                          Delivery Address:
                          <span>
                            {item.order_address}
                          </span>
                        </p>
                      </Row>
                      <Row className="p-1">
                        <Col>
                          <p>
                            Order Placed Time: <span>{getTime(item.created_at)}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          className="d-none d-md-block"
                          md={{ span: 7, offset: 5 }}
                          onClick={() => handleClickItem(item.id)}
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
        {/* Received Orders from Customer end //Orders Preparing for delivery start */}
        {search !== ""
          ? forOtw
              ?.filter((item) =>
                item.id
                  .toString()
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .map((item, index) => {
                return (
                  <Accordion className={styles.test} flush key={index}>
                    <Accordion.Item eventKey={item.id}>
                      <div className={styles.orderDiv}>
                        <CustomToggle eventKey={item.id}>
                          Order ID: {item.id}
                        </CustomToggle>
                        <div className="d-md-none">
                          <div
                            className="d-md-none"
                            onClick={() => handleClickItem(item.id)}
                          >
                            <CustomToggle2 eventKey={item.id}>
                              View Details
                            </CustomToggle2>
                          </div>
                        </div>
                      </div>
                      <Accordion.Body className={styles.deliveryDetails2}>
                        <div>
                          <Row>
                            <Col>
                              <p>
                                Customer Name: <span>{item.customer_name}</span>
                              </p>
                            </Col>
                            <Col>
                              <p>
                                Contact Number:{" "}
                                <span>{item.customer_mobile} </span>
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <p>
                              Pick-up address:
                              <span>
                                {item.restaurant_address}
                              </span>
                            </p>
                          </Row>
                          <Row>
                            <p>
                              Delivery Address:
                              <span>
                                {item.order_address}
                              </span>
                            </p>
                          </Row>
                          <Row>
                            <Col>
                              <p>
                                Order Placed Time: <span>{getTime(item.created_at)}</span>
                              </p>
                            </Col>
                            <Col>
                              <p>
                                Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                              </p>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col>
                              <p>Order Details:</p>
                              <ul>
                                {productItem?.products.map((item, index) => (
                                  <li key={index}>
                                    {item.quantity}x {item.name}
                                  </li>
                                ))}
                              </ul>
                            </Col>
                            <Col>
                              <div className={styles.resto}>
                                <p>{item.restaurant_name}</p>
                                <img
                                  src={productItem?.restaurant_photo}
                                  alt="resto"
                                />
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
                              <div className={styles.status}>
                                <p>Order Status</p>
                                {item?.order_status === "pending" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={orderReceived} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Pending
                                    </p>
                                  </div>
                                )}
                                {item?.order_status === "preparing" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={kitchenPrep} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Kitchen Preparing...
                                    </p>
                                  </div>
                                )}
                                {item?.order_status === "otw" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={riderOTW} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Rider On Its Way
                                    </p>
                                  </div>
                                )}
                                {item?.order_status === "delivered" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img src={riderDelivered} />
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Order Delivered
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <div className={styles.declineAccept}>
                            {
                              item?.order_status === "pending" ? (
                              <Button onClick={() => handleAccept(item.id)}>
                                Accept
                              </Button>
                              ) : null
                            }
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Row className={styles.forDeliveryMobile}>
                      <Col
                        xs={1}
                        className={`${styles.deliveryDetails} d-md-none`}
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
                              Contact Number: <span>{item.customer_mobile}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <p>
                            Pick-up address:
                            <span>
                              {item.restaurant_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <p>
                            Delivery Address:
                            <span>
                              {item.order_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                              Order Placed Time: <span>{getTime(item.created_at)}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row
                      className={`${styles.forDeliveryDesktop} d-none d-md-block`}
                    >
                      <Col
                        className={styles.deliveryDetails}
                        style={{ display: isShown ? "block" : "none" }}
                      >
                        <Row className="p-1">
                          <Col>
                            <p>
                              Customer Name: <span>{item.customer_name}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Contact Number: <span>{item.customer_mobile}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row className="p-1">
                          <p>
                            Pick-up address:
                            <span>
                              {item.restaurant_address}
                            </span>
                          </p>
                        </Row>
                        <Row className="p-1">
                          <p>
                            Delivery Address:
                            <span>
                              {item.order_address}
                            </span>
                          </p>
                        </Row>
                        <Row className="p-1">
                          <Col>
                            <p>
                              Order Placed Time: <span>{getTime(item.created_at)}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            className="d-none d-md-block"
                            md={{ span: 7, offset: 5 }}
                            onClick={() => handleClickItem(item.id)}
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
              })
          : forOtw.map((item, index) => {
              return (
                <Accordion className={styles.test} flush key={index}>
                  <Accordion.Item eventKey={item.id}>
                    <div className={styles.orderDiv}>
                      <CustomToggle eventKey={item.id}>
                        Order ID: {item.id}
                      </CustomToggle>
                      <div className="d-md-none">
                        <div
                          className="d-md-none"
                          onClick={() => handleClickItem(item.id)}
                        >
                          <CustomToggle2 eventKey={item.id}>
                            View Details
                          </CustomToggle2>
                        </div>
                      </div>
                    </div>
                    <Accordion.Body className={styles.deliveryDetails2}>
                      <div>
                        <Row>
                          <Col>
                            <p>
                              Customer Name: <span>{item.customer_name}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Contact Number:{" "}
                              <span>{item.customer_mobile}</span>
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <p>
                            Pick-up address:
                            <span>
                              {item.restaurant_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <p>
                            Delivery Address:
                            <span>
                            {item.order_address}
                            </span>
                          </p>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                              Order Placed Time: <span>{getTime(item.created_at)}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                            </p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <p>Order Details:</p>
                            <ul>
                              {productItem?.products.map((item, index) => (
                                <li key={index}>
                                  {item.quantity}x {item.name}
                                </li>
                              ))}
                            </ul>
                          </Col>
                          <Col>
                            <div className={styles.resto}>
                              <p>{item.restaurant_name}</p>
                              <img
                                src={productItem?.restaurant_photo}
                                alt="resto"
                              />
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
                            <div className={styles.status}>
                              <p>Order Status</p>
                              {item?.order_status === "pending" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={orderReceived} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Pending
                                  </p>
                                </div>
                              )}
                              {item?.order_status === "preparing" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={kitchenPrep} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Kitchen Preparing...
                                  </p>
                                </div>
                              )}
                              {item?.order_status === "otw" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={riderOTW} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Rider On Its Way
                                  </p>
                                </div>
                              )}
                              {item?.order_status === "delivered" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={riderDelivered} />
                                  <p
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Order Delivered
                                  </p>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <div className={styles.declineAccept}>
                          {
                            item?.order_status === "pending" ? (
                            <Button onClick={() => handleAccept(item.id)}>
                              Accept
                            </Button>
                            ) : null
                          }
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Row className={styles.forDeliveryMobile}>
                    <Col
                      xs={1}
                      className={`${styles.deliveryDetails} d-md-none`}
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
                            Contact Number: <span>{item.customer_mobile}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          Pick-up address:
                          <span>
                          {item.restaurant_address}
                          </span>
                        </p>
                      </Row>
                      <Row>
                        <p>
                          Delivery Address:
                          <span>
                          {item.order_address}
                          </span>
                        </p>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            Order Placed Time: <span>{getTime(item.created_at)}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    className={`${styles.forDeliveryDesktop} d-none d-md-block`}
                  >
                    <Col
                      className={styles.deliveryDetails}
                      style={{ display: isShown ? "block" : "none" }}
                    >
                      <Row className="p-1">
                        <Col>
                          <p>
                            Customer Name: <span>{item.customer_name}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Contact Number: <span>{item.customer_mobile}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row className="p-1">
                        <p>
                          Pick-up address:
                          <span>
                          {item.restaurant_address}
                          </span>
                        </p>
                      </Row>
                      <Row className="p-1">
                        <p>
                          Delivery Address:
                          <span>
                          {item.order_address}
                          </span>
                        </p>
                      </Row>
                      <Row className="p-1">
                        <Col>
                          <p>
                            Order Placed Time: <span>{getTime(item.created_at)}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Order Delivered Time: <span>{getTime(item.updated_at)}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          className="d-none d-md-block"
                          md={{ span: 7, offset: 5 }}
                          onClick={() => handleClickItem(item.id)}
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
      </div>
      <Col className={`${styles.mobileButtonContent} d-lg-none w-100`}>
        <Row>
          <Col className="col-6">
            <Button
              onClick={() => setModalShow1(true)}
              className={styles.buttons}
            >
              Completed
            </Button>
            <CompletedModal
              show={modalShow1}
              onHide={() => setModalShow1(false)}
            />
          </Col>
          <Col className="col-6">
            <Button
              onClick={() => setModalShow2(true)}
              className={styles.buttons}
            >
              Cancelled
            </Button>
            <CancelledModal
              show={modalShow2}
              onHide={() => setModalShow2(false)}
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default OrderContent;
