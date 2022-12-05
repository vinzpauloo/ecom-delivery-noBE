import React, { useEffect, useState } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import statusIsReceived from "../../../assets/images/order-received.png";
import statusIsPreparing from "../../../assets/images/kitchen-prep.png";
import statusIsPreparingAlt from "../../../assets/images/order-preparing-alt.png";
import statusIsOtw from "../../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../../assets/images/delivered.png";
import OrderCancel from "../../../assets/images/order-cancel.png";
import OrderDelivered from "../../../assets/images/order-delivered.png";
import WazeIcon from "../../../assets/images/waze.png";

import styles from "./OrderContent.module.scss";
import { useOrders } from "../../../hooks/useOrders";
import { useOrder } from "../../../hooks/useOrder";
import { useRiderOTW } from "../../../hooks/useRiderOTW";

// import Pusher from "pusher-js";
// import * as PusherTypes from "pusher-js";

// var presenceChannel: PusherTypes.PresenceChannel;

// const pusher = new Pusher("dda7bca342e12a644ba2", {
//   cluster: "ap1",
// });

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
  id: number;
  restaurant_address: string;
  total_amount: number;
  received_at: string;
};

type TOrder = {
  id?: number;
  created_at?: string;
  customer_id?: number;
  customer_name?: string;
  customer_mobile?: string;
  order_address?: string;
  order_status?: string;
  restaurant_address?: string;
  total_amount?: number;
  products?: [{ name: string; quantity: number }];
  plate_number?: string;
  received_at?: string;
  restaurant_name?: string;
};

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const [order, setOrder] = useState<TOrder | null>(null);
  const { getOrdersByIdGuest } = useOrders();
  const isAuthenticated = useIsAuthenticated();
  const { updateOrder, getOrdersById, acceptOrder } = useOrder();
  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);
  const [status, setStatus] = useState<ForDeliveryItem>();
  const [orderData, setOrderData] = useState<any>([]);
  const [modalShow, setModalShow] = React.useState(false);

  const [products, setProducts] = useState<any>([]);

  const navigate = useNavigate();
  // Get the params from the URL
  const { id } = useParams();

  const {
    getForDelivery,
    getForDeliveryOTW,
    getOrderCompleted,
    getOrderCanceled,
  } = useRiderOTW();

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

  const handleAccept = async () => {
    console.log(id);
    setModalShow(true);
    const response = await updateOrder(id, "otw");
    alert("updated status otw successfully");
    // navigate(`/account/orders/${id}/otw`);

    console.log(response);
    setOrderData(response);
  };

  const [productItem, setProductItem] = useState<TOrder>();

  const handleClickItem = async (props: any) => {
    const response = await getOrdersById(props);
    console.log("getOrdersById response", response);
    setProductItem(response);
  };

  const handleDelivered = async () => {
    console.log(id);
    setModalShow(true);
    const response = await updateOrder(id, "delivered");
    alert("updated status delivered successfully");

    navigate(`/account/order-history`);

    // console.log(response);
    // setOrderData(response);
  };

  const loadOrder = async () => {
    if (isAuthenticated()) {
      // Get user order
      const response = await getOrdersById(id);
      console.log("getOrdersById response", response);
      console.log(response.products);
      setOrder(response);
      setProducts(response.products);
    } else {
      // Get guest session in local storage
      const guestSession = localStorage.getItem("guestSession");

      // Get guest order
      const response = await getOrdersByIdGuest(id, guestSession);
      console.log("getOrdersByIdGuest response", response);
      setOrder(response);
    }
  };

  useEffect(() => {
    loadOrder();
    loadOrderForDelivery("preparing");
  }, []);

  function OtwModal(props: any) {
    return (
      <Modal {...props} size="lg" aria-labelledby="">
        {/* <Modal.Header closeButton className="px-4">
          <Modal.Title id="" className="ms-auto">
            Rider On Its Way
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="p-0">
          <div className={styles.modal}>
            <div className={styles.title}>
              <Row>
                <Col>
                  <h3>Order ID: {id}</h3>
                </Col>
              </Row>
              <Row xs={1} md={2}>
                <Col>
                  <p>
                    Restaurant Name <span>{orderData.restaurant_id}</span>
                  </p>
                </Col>
                <Col>
                  <p>
                    Restaurant Contact <span>{orderData.mobile}</span>
                  </p>
                </Col>
              </Row>
            </div>
            <div className={styles.customerDetails}>
              <Row>
                <Col>
                  <p>
                    Customer Name:{" "}
                    <span>
                      {orderData.first_name} {orderData.last_name}
                    </span>
                  </p>
                </Col>
                <Col>
                  <p>
                    Customer Contact: <span>{orderData.mobile}</span>
                  </p>
                </Col>
                <hr />
              </Row>
              <Row>
                <Col>
                  <p>
                    Pick up Address: <span>{orderData.address} </span>
                  </p>
                </Col>
                <Col>
                  <p>
                    Delivery Address: <span>{orderData.address}</span>
                  </p>
                </Col>
                <hr />
              </Row>
              <Row>
                <Row>
                  <Col>
                    <p>
                      Delivery Fee: <span>80 php</span>
                    </p>
                    <p>
                      Type of Payment: <span>COD (Cash)</span>
                    </p>
                  </Col>

                  <Col>
                    <Row className={styles.canceledDelivered} xs={2} md={5}>
                      <Col className={styles.orderBtn}>
                        <img src={OrderCancel} />
                        <Link to={"/account/order-history"}>
                          <Button>Canceled</Button>
                        </Link>
                      </Col>
                      <Col className={styles.orderBtn}>
                        <img src={OrderDelivered} />
                        <Link to={`/account/order-history`}>
                          <Button onClick={handleDelivered}>Delivered</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </div>
            <Container className={styles.orderDetails}>
              <Row>
                <Col>
                  <p>
                    Order Placed Date: <span>{orderData.received_at}</span>
                  </p>
                </Col>
                <Col>
                  <p>
                    Order Placed Time: <span>{orderData.received_at}</span>
                  </p>
                </Col>
              </Row>
              <Row>
                <ul title="Items:">
                  <Row>
                    <Col>
                      {products?.map((item: any, index: any) => {
                        console.log("test");
                        return (
                          <li key={index}>
                            {item.quantity} x {item.name}
                          </li>
                        );
                      })}
                      &nbsp;
                      <p>Total:</p>
                      <li>₱{order?.total_amount}.00</li>
                      {/* <li> </li>
                      <li>Ramen Noodles</li>
                      <li>
                        {" "}
                        2x Milk tea <span>(1 watermelon)</span>
                        <span>(1 Soya bean)</span>
                      </li>
                      <li> 1x Peking Duck</li> */}
                    </Col>
                    {/* <Col>
                      <li>145php x3 - 435php</li>
                      <li> 120php x2 - 240php</li>
                      <li> 500php 1x - 500php</li>
                    </Col> */}
                  </Row>
                </ul>
              </Row>
            </Container>
            <Row>
              <Col md={{ span: 0, offset: 5 }} xs={{ span: 0, offset: 4 }}>
                <a
                  href="https://waze.com/ul?q=Glorietta%202%20Basement%20Parking&ll=14.55147636%2C121.02443576&navigate=yes"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={WazeIcon} alt="" className={styles.wazeImg} />
                </a>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className={styles.container}>
      <div className="text-center">
        <div className={styles.title}>
          <h3>Order Tracker</h3>
          <p>Please don't close the page.</p>
          <h4 className="mt-2">Order ID: {id} </h4>
        </div>
        {/* {forDelivery?.map((item, index) => {
          return ( */}
        <Row md={4} xs={1}>
          <Col>
            <div className={styles.status}>
              <img src={statusIsReceived} alt="" />
              <p>Order Received</p>
            </div>
            {/* <Button disabled>Activated</Button> */}
          </Col>
          <Col>
            <div className={styles.status}>
              <div className={styles.imgContainer}>
                <img src={statusIsPreparing} alt="" />
                {order?.order_status === "preparing" && (
                  <img
                    src={statusIsPreparingAlt}
                    alt=""
                    className={styles.altImg}
                  />
                )}
                <p>Kitchen Preparing ...</p>
              </div>
            </div>
            {/* <Button disabled>Activated</Button> */}
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsOtw} alt="" />
              <p>Rider on its way</p>
            </div>

            <Button
              type="submit"
              onClick={() => {
                handleAccept();
                handleClickItem(id);
              }}
              className={styles.activateBtn}
              // onClick={() => setModalShow(true)}
            >
              Activate
              {/* <Link to={`/account/orders/${item.id}/otw`}>Activate</Link> */}
            </Button>
            <OtwModal show={modalShow} onHide={() => setModalShow(false)} />
          </Col>
          <Col className={styles.delivered}>
            <div className={styles.status}>
              <img src={statusIsDelivered} alt="" />
              <p>Delivered</p>
            </div>
            {/* <Link to="/account/order-history">
              <Button className={styles.button}>Activate</Button>
            </Link> */}
          </Col>
        </Row>
        {/* );
        })} */}
      </div>

      {/* <div className={styles.testing}>
        <h6 className="mt-4 text-success">
          For testing only.
          <br />
          Is Guest?: {!isAuthenticated() ? "yes" : "no"}
          <br />
          Can view order?: {order ? "yes" : "no"}
          <br />
          {order ? (
            <>
              Order ID: {order?.id}
              <br />
              Order status: {order?.order_status || "Processing..."}
              <br />
              Created at: {order?.created_at}
            </>
          ) : (
            <></>
          )}
        </h6>
      </div> */}
    </div>
  );
};

export default OrderContent;
