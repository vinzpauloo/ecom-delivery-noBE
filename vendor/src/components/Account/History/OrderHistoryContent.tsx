import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  Container,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetOrderStatus } from "../../../hooks/useGetOrderStatus";
import { useOrder } from "../../../hooks/useOrder";

import styles from "./OrderHistoryContent.module.scss";

interface ContainerProps {}

type GetAllOrderItem = {
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
  restaurant_address: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: number;
};

// type GetPreparingItem = {
//   created_at: string;
//   customer_id: string;
//   customer_mobile: string;
//   customer_name: string;
//   order_address: string;
//   order_email: string;
//   order_mobile: string;
//   order_status: string;
//   otw_at: string;
//   payment_type: string;
//   plate_number: string;
//   restaurant_name: string;
//   restaurant_id: string;
//   updated_at: string;
//   rider_id: string;
//   rider_vehicle_model: string;
//   id: number;
// };

// type GetOTWItem = {
//   created_at: string;
//   customer_id: string;
//   customer_mobile: string;
//   customer_name: string;
//   order_address: string;
//   order_email: string;
//   order_mobile: string;
//   order_status: string;
//   otw_at: string;
//   payment_type: string;
//   plate_number: string;
//   restaurant_name: string;
//   restaurant_id: string;
//   updated_at: string;
//   rider_id: string;
//   rider_vehicle_model: string;
//   id: number;
// };

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
  rider_id: string;
  rider_vehicle_model: string;
  id: number;
};

type GetCanceledItem = {
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
  id: number;
};

const OrderHistoryContent: React.FC<ContainerProps> = ({}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const { getReceived, getAllOrders, getOrderCompleted, getOrderCanceled } =
    useGetOrderStatus();

  const [allOrderItem, setAllOrderItem] = useState<GetAllOrderItem[]>([]);
  const [canceledItem, setCanceledItem] = useState<GetCanceledItem[]>([]);
  // const [preparingItem, setPreparingItem] = useState<GetPreparingItem[]>([]);
  // const [otwItem, setOtwItem] = useState<GetOTWItem[]>([]);
  const [deliveredItem, setDeliveredItem] = useState<GetDeliveredItem[]>([]);

  const loadAllOrderItem = async (except_status: string) => {
    const params = { except_status: except_status };
    const response = await getAllOrders(params);
    console.log("getAllOrders", response);
    setAllOrderItem(response.data);
  };

  const loadCanceledItem = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCanceled(params);
    console.log("getOrderCanceled", response);
    setCanceledItem(response.data);
  };

  // const loadOrderForDelivery = async (status: string) => {
  //   const params = { status: status };
  //   const response = await getForDeliveryOTW(params);
  //   console.log("getForDelivery", response);
  //   setForDelivery(response.data);
  // };

  const loadDeliveredItem = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCompleted(params);
    console.log("getOrderCompleted", response);
    setDeliveredItem(response.data);
  };

  useEffect(() => {
    loadAllOrderItem("pending");
    // loadOrderForDelivery("otw");
    // loadPreparingItem("preparing");
    loadCanceledItem("canceled");
    loadDeliveredItem("delivered");
  }, []);

  function CompletedModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="px-4">
          <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
            COMPLETED
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {deliveredItem?.map((item, index) => {
            return (
              <Container
                className={`${styles.orderDeliveryContainer} d-flex flex-column gap-2`}
                // className="order-delivery-container d-flex flex-column gap-2"
                fluid
                key={index}
              >
                <Row className="mx-md-3">
                  <Col xs={3} md={2} className="d-flex flex-column gap-1">
                    <div className={styles.orderId}>
                      <p>ORDER ID: {item.id}</p>
                    </div>
                    <div className={styles.orderItems}>
                      <ul aria-label="Order Items">
                        <li>Ramen Noodles(3x)</li>
                        <li>Milk Tea(2x)</li>
                        <li>1 Water Melon</li>
                        <li>1 Boba Soya</li>
                        <li>Pecking Duck (1x)</li>
                      </ul>
                    </div>
                    <div className={styles.deliveryFee}>
                      <p>
                        Delivery Fee <br />
                        <span>₱{item.rider_id}.00</span>
                      </p>
                    </div>
                    <div className={styles.grandTotal}>
                      <p>
                        Grand Total <br />
                        <span>₱{item.rider_vehicle_model}.00</span>
                      </p>
                    </div>
                  </Col>
                  <Col xs={8} md={4}>
                    <div className={styles.customerInfo}>
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
                        {/* <img src={OrderReceivedIcon} /> */}
                      </li>

                      <div className={styles.declineAccept}>
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
          {canceledItem?.map((item, index) => {
            return (
              <Container
                className={`${styles.orderDeliveryContainer} d-flex flex-column gap-3`}
                // className="order-delivery-container d-flex flex-column gap-3"
                fluid
                key={index}
              >
                <Row className="mx-md-3">
                  <Col xs={3} md={2} className="d-flex flex-column gap-1">
                    <div className={styles.orderId}>
                      <p>ORDER ID: {item.id}</p>
                    </div>
                    <div className={styles.orderItems}>
                      <ul aria-label="Order Items">
                        <li>Ramen Noodles(3x)</li>
                        <li>Milk Tea(2x)</li>
                        <li>1 Water Melon</li>
                        <li>1 Boba Soya</li>
                        <li>Pecking Duck (1x)</li>
                      </ul>
                    </div>
                    <div className={styles.deliveryFee}>
                      <p>
                        Delivery Fee <br />
                        <span>85 php</span>
                      </p>
                    </div>
                    <div className={styles.grandTotal}>
                      <p>
                        Grand Total <br />
                        <span>1,350 php</span>
                      </p>
                    </div>
                  </Col>
                  <Col xs={8} md={4}>
                    <div className={styles.customerInfo}>
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
                        {/* <img src={OrderReceivedIcon} /> */}
                      </li>

                      <div className={styles.declineAccept}>
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
    <div className={styles.container}>
      <h3>History</h3>
      <div className={styles.innerContainer}>
        <Form>
          <Row className="">
            <Col>
              {/* <Form.Control
                className={styles.searchBar}
                type="text"
                placeholder="Search food and description"
              /> */}
            </Col>
            {/* <Col>
              <Button
                className={`d-none d-md-block ${styles.btnCancelled}`}
                onClick={() => setModalShow1(true)}
              >
                Cancelled
              </Button>
              <CancelledModal
                show={modalShow1}
                onHide={() => setModalShow1(false)}
              />
              <Button
                className={`d-none d-md-block ${styles.btnCompleted}`}
                onClick={() => setModalShow(true)}
              >
                Completed
              </Button>
              <CompletedModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Col> */}
          </Row>
        </Form>
        {/* Mobile */}
        {/* {allOrderItem?.map((item, index) => {
          return (
            <Container
              className={`${styles.orderDeliveryContainer} d-flex flex-column gap-3 d-md-none`}
              className="order-delivery-container d-flex flex-column gap-3 d-md-none"
              fluid
              key={index}
            >
              <Row className="mx-md-3">
                <Col xs={3} md={2} className="d-flex flex-column gap-1">
                  <div className={styles.orderId}>
                    <p>Order ID: {item.id}</p>
                  </div>
                  <div className={styles.orderItems}>
                    <ul aria-label="Order Items">
                      <li>Ramen Noodles(3x)</li>
                      <li>Milk Tea(2x)</li>
                      <li>1 Water Melon</li>
                      <li>1 Boba Soya</li>
                      <li>Pecking Duck (1x)</li>
                    </ul>
                  </div>
                  <div className={styles.deliveryFee}>
                    <p>
                      Delivery Fee <br />
                      <span>₱{item.rider_id}.00</span>
                    </p>
                  </div>
                  <div className={styles.grandTotal}>
                    <p>
                      Grand Total <br />
                      <span>₱{item.rider_vehicle_model}.00</span>
                    </p>
                  </div>
                </Col>
                <Col xs={8} md={4}>
                  <div className={styles.customerInfo}>
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

                    <div className={styles.declineAccept}>
                      <a>Decline</a>
                      <a>Accept</a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          );
        })} */}
        {/* Desktop */}
        {allOrderItem?.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <Row>
                {/* Main content */}
                <Col lg={{ span: 12 }}>
                  <Row>
                    {/* Order ID */}
                    <Col md={3}>
                      <div className={styles.flexOnMobile}>
                        <div className={styles.orderId}>
                          <h6 className="text-center text-uppercase">
                            Order ID : {item.id}
                          </h6>
                        </div>

                        <div className={styles.btnView}>
                          <Link to={`/account/order-history/${item.id}`}>
                            View Details
                          </Link>
                        </div>
                      </div>
                    </Col>

                    {/* Order information */}
                    <Col md={9}>
                      <div className={styles.orderDetails}>
                        <Row>
                          <Col>
                            {/* Customer name & contact number */}
                            <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                              <Col>
                                <Row className="mb-2 mb-sm-0">
                                  <Col xs={5} sm={6}>
                                    <p>Customer Name :</p>
                                  </Col>
                                  <Col xs={7} sm={6}>
                                    <p className={styles.value}>
                                      {item.customer_name}
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Row className="mb-2 mb-sm-0">
                                  <Col xs={5} sm={6}>
                                    <p>Contact Number :</p>
                                  </Col>
                                  <Col xs={7} sm={6}>
                                    <p className={styles.value}>
                                      {item.customer_mobile}
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            {/* Pick up address */}
                            <Row className="mb-2 mb-sm-3">
                              <Col sm={3} xs={5}>
                                <p>Pick up Address :</p>
                              </Col>
                              <Col sm={9} xs={7}>
                                <p className={styles.value}>
                                  {item.restaurant_address}
                                </p>
                              </Col>
                            </Row>

                            {/* Delivery address */}
                            <Row className="mb-2 mb-sm-3">
                              <Col sm={3} xs={5}>
                                <p>Delivery Address :</p>
                              </Col>
                              <Col sm={9} xs={7}>
                                <p className={styles.value}>
                                  {item.order_address}
                                </p>
                              </Col>
                            </Row>

                            {/* Order placed & delivered time */}
                            <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                              <Col>
                                <Row className="mb-2 mb-sm-0">
                                  <Col xs={5} sm={6}>
                                    <p>Order Placed Time :</p>
                                  </Col>
                                  <Col xs={7} sm={6}>
                                    <p className={styles.value}>
                                      {/* {getTime(item.created_at)} */}
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Row className="mb-2 mb-sm-0">
                                  <Col xs={5} sm={6}>
                                    <p>Order Delivered Time :</p>
                                  </Col>
                                  <Col xs={7} sm={6}>
                                    <p className={styles.value}>
                                      {/* {item.delivered_at
                                        ? getTime(item.delivered_at)
                                        : "Waiting ..."} */}
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            {/* Date ordered & View details */}
                            <Row sm={2} xs={1}>
                              <Col>
                                <Row>
                                  <Col xs={5} sm={6}>
                                    <p>Date Ordered :</p>
                                  </Col>
                                  <Col xs={7} sm={6}>
                                    <p className={styles.value}>
                                      {/* {getDate(item.created_at)} */}
                                    </p>
                                  </Col>
                                </Row>
                              </Col>

                              {/* View details - medium screens up */}
                              <Col className="d-none d-md-block">
                                <Row>
                                  <Col>
                                    <div className={styles.btnView}>
                                      <Link
                                        to={`/account/order-history/${item.id}`}
                                      >
                                        View Details
                                      </Link>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryContent;
