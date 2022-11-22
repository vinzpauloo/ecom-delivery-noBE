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

type GetReceivedItem = {
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

  const [receivedItem, setReceivedItem] = useState<GetReceivedItem[]>([]);
  const [canceledItem, setCanceledItem] = useState<GetCanceledItem[]>([]);
  // const [preparingItem, setPreparingItem] = useState<GetPreparingItem[]>([]);
  // const [otwItem, setOtwItem] = useState<GetOTWItem[]>([]);
  const [deliveredItem, setDeliveredItem] = useState<GetDeliveredItem[]>([]);

  const loadAllOrderItem = async (except_status: string) => {
    const params = { paginate: 3, except_status: except_status };
    const response = await getAllOrders(params);
    console.log("getAllOrders", response);
    setReceivedItem(response.data);
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
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          <Row>
            <Col>
              <h3>History</h3>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Form.Control
                className={styles.searchBar}
                type="text"
                placeholder="Search food and description"
              />
            </Col>
            <Col>
              <Button
                className={styles.btnCancelled}
                onClick={() => setModalShow1(true)}
              >
                Cancelled
              </Button>
              <CancelledModal
                show={modalShow1}
                onHide={() => setModalShow1(false)}
              />
              <Button
                className={styles.btnCompleted}
                onClick={() => setModalShow(true)}
              >
                Completed
              </Button>
              <CompletedModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Col>
          </Row>
        </Form>
        {/* Mobile */}
        {receivedItem?.map((item, index) => {
          return (
            <Container
              className={`${styles.orderDeliveryContainer} d-flex flex-column gap-3 d-md-none`}
              // className="order-delivery-container d-flex flex-column gap-3 d-md-none"
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
        {/* Desktop */}
        {receivedItem?.map((item, index) => {
          return (
            <Container
              className={styles.orderDeliveryContainerDesktop}
              fluid
              key={index}
            >
              <Row className="mx-md-3">
                <Col md={2} className="d-flex flex-column gap-1">
                  <div className={styles.orderId}>
                    <p>ORDER ID: {item.id}</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.customerInfo}>
                    <Row>
                      <Col md={8}>
                        <div className="d-flex gap-5">
                          <li>
                            Customer Name: <span> {item.customer_name}</span>
                          </li>
                          <li>
                            Contact Number: <span> {item.customer_mobile}</span>
                          </li>
                        </div>
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
                      </Col>
                      <Col>
                        <li className="d-flex flex-column justify-content-center align-items-center">
                          Order Status: <span> {item.order_status}</span>
                          {/* <img src={OrderReceivedIcon} /> */}
                        </li>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <div className={`${styles.orderItems} overflow-auto`}>
                          <ul aria-label="Order Items">
                            <li>Ramen Noodles(3x)</li>
                            <li>Milk Tea(2x)</li>
                            <li>1 Water Melon</li>
                            <li>1 Boba Soya</li>
                            <li>Pecking Duck (1x)</li>
                          </ul>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={styles.deliveryFee}>
                          <p>
                            Delivery Fee <br />
                            <span> ₱{item.rider_id}.00</span>
                          </p>
                          <div className={styles.declineAccept}>
                            <a>Decline</a>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={styles.grandTotal}>
                          <p>
                            Grand Total <br />
                            <span> ₱{item.restaurant_id}.00</span>
                          </p>
                          <div className={styles.declineAccept}>
                            <a>Accept</a>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryContent;
