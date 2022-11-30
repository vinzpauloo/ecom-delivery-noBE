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
} from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useNavigate, Link } from "react-router-dom";
import { useGetOrderStatus } from "../../../hooks/useGetOrderStatus";
import { useOrder } from "../../../hooks/useOrder";

import styles from "./OrderContent.module.scss";

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
  restaurant_address: string;
  total_amount: number;
};

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const {
    getCurrentOrder,
    getForDeliveryOTW,
    getOrderCompleted,
    getOrderCanceled,
  } = useGetOrderStatus();

  const { updateOrder, cancelOrder } = useOrder();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

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

  const handleCancel = async (id: any) => {
    const response = await cancelOrder(id, "cancel");
    alert("declined order");
    window.location.reload();
    navigate("/account/for-delivery");
  };

  const handleAccept = async (id: any) => {
    console.log(id);
    const response = await updateOrder(id, "received");
    console.log(response);
  };

  const handleClick = (e: any) => {
    setIsShown((current) => !current);
  };

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

  useEffect(() => {
    loadPendingOrder("pending");
  }, []);
  return (
    <div className={styles.deliveryContainer}>
      <div className={styles.tableContainerHistory}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeader1}>
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
          <Accordion className={styles.test} flush key={index}>
            <Accordion.Item eventKey={item.id}>
              <div className={styles.orderDiv}>
                <CustomToggle eventKey={item.id}>
                  {/* <Button className="orderIdBtn">Order ID : {item.id}</Button>
                <Button className="viewDetailsBtn">View Details</Button> */}
                  Order ID: {item.id}
                </CustomToggle>
                <div className="d-md-none">
                  <CustomToggle2 eventKey={item.id}>View Details</CustomToggle2>
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
                      <div className={styles.resto}>
                        <p>Chan's Restaurant</p>
                        {/* <img src={RestoIcon} alt="resto" /> */}
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
                        <span>Order Received</span>
                      </div>
                    </Col>
                  </Row>
                  <div className={styles.declineAccept}>
                    {/* <button>Decline</button> */}
                    <Link to={`/account/for-delivery/order/${item.id}`}>
                      <button>Accept</button>
                    </Link>
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
            <Row className={`${styles.forDeliveryDesktop} d-none d-md-block`}>
              <Col
                className={styles.deliveryDetails}
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
      <div className={styles.rewardsContainer}>
        <div className={styles.rewardsButton}>
          <a href="/account/rewards">
            {/* <img src={RewardsBtn} alt="" /> */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderContent;
