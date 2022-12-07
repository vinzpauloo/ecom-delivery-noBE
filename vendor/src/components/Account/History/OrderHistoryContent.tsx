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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderStatus } from "../../../hooks/useGetOrderStatus";
import searchIcon from "../../../assets/images/searchIcon.png";
import { useOrder } from "../../../hooks/useOrder";

import styles from "./OrderHistoryContent.module.scss";
import { getDate, getTime } from "../../../utils/formatDate";

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
  delivered_at: string;
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
  delivered_at: string;
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
  rider_name: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: number;
};

const OrderHistoryContent: React.FC<ContainerProps> = ({}) => {
  const navigate = useNavigate();
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const { getReceived, getAllOrders, getOrderCompleted, getOrderCanceled } =
    useGetOrderStatus();
  const [search, setSearch] = useState("");
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

  const loadDeliveredItem = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCompleted(params);
    console.log("getOrderCompleted", response);
    setDeliveredItem(response.data);
  };

  const handleClickComplete = (id) => {
    navigate("completed/" + id);
  };
  const handleClickCancel = (id) => {
    navigate("cancelled/" + id);
  };

  useEffect(() => {
    loadAllOrderItem("pending");
    // loadOrderForDelivery("otw");
    // loadPreparingItem("preparing");
    loadCanceledItem("canceled");
    loadDeliveredItem("delivered");
  }, []);

  console.log("!!!",deliveredItem, canceledItem);
  

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
                            {getDate(item.created_at)}
                          </Row>
                        </Col>
                        <Col>
                          <Row className={styles.lable}>Order Placed Time</Row>
                          <Row className={styles.lable}>
                            {getTime(item.created_at)}
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
                            {getTime(item.delivered_at)}
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
                {/* <Col className={styles.modalHeader}>Rider Name</Col> */}
              </Row>
            </Container>
            {canceledItem?.map((item, index) => {
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
                      {getDate(item.created_at)}
                    </Col>
                    <Col className={styles.modalHeader}>
                      {getTime(item.created_at)}
                    </Col>
                    <Col className={styles.modalHeader}>
                      {getTime(item.updated_at)}
                    </Col>
                    {/* <Col className={styles.modalHeader}>{item.rider_name}</Col> */}
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
            {canceledItem?.map((item, index) => {
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
                            {getDate(item.created_at)}
                          </Row>
                        </Col>
                        <Col>
                          <Row className={styles.lable}>Order Placed Time</Row>
                          <Row className={styles.lable}>
                            {getTime(item.created_at)}
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
                            {getTime(item.updated_at)}
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
      <div className={styles.container}>
        <Row>
          <Row className="d-none d-lg-block">
            <h3>History</h3>
          </Row>
          <Row>
            <Row className="d-none d-lg-flex">
              <Col className={`${styles.searchInput} search col-6`}>
                <input
                  type="text"
                  placeholder="Search order ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <img className={styles.searchIcon} src={searchIcon} alt="" />
              </Col>
              <Col className={`${styles.buttonContent} col-6`}>
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
            <div className={`${styles.mobileHeader} d-lg-none`}>
              <Row>
                <Col className={`${styles.headerH3}`}>
                  <h3>History</h3>
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
          </Row>
        </Row>
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
          {search !== ""
            ? allOrderItem
                ?.filter((item) =>
                  item.id
                    .toString()
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                )
                .map((item, index) => {
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
                                  <Link
                                    to={`/account/order-history/${item.id}`}
                                  >
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
                                              {getTime(item.created_at)}
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
                                              {getTime(item.delivered_at)}
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
                                              {getDate(item.created_at)}
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
                })
            : allOrderItem?.map((item, index) => {
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
                                            {getTime(item.created_at)}
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
                                            {getTime(item.delivered_at)}
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
                                            {getDate(item.created_at)}
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

export default OrderHistoryContent;
