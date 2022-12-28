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
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetOrderStatus } from "../../../hooks/useGetOrderStatus";
import { useRiderOTW } from "../../../hooks/useRiderOTW";
import constants from "../../../utils/constants.json";

import styles from "./OrderHistoryContent.module.scss";

import SearchIcon from "../../../assets/images/search.png";

import { getDate, getTime } from "../../../utils/formatDate";

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
  restaurant_address: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: string;
  rider_name: string;
  delivered_at: string;
  received_at: string;
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
  restaurant_address: string;
  updated_at: string;
  rider_id: string;
  rider_name: string;
  rider_vehicle_model: string;
  id: string;
  delivered_at: string;
  received_at: string;
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
  id: string;
  delivered_at: string;
  rider_name: string;
};

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

const OrderHistoryContent: React.FC<ContainerProps> = ({}) => {
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const {
    getForDelivery,
    getForDeliveryOTW,
    getOrderCompleted,
    getOrderCanceled,
  } = useRiderOTW();

  const { getAllOrders } = useGetOrderStatus();

  const [allOrderItem, setAllOrderItem] = useState<GetAllOrderItem[]>([]);

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const [forOrderCompleted, setForOrderCompleted] = useState<
    ForCompletedItem[]
  >([]);

  const [forOrderCanceled, setForOrderCanceled] = useState<ForCanceledItem[]>(
    []
  );

  const [orders, setOrders] = useState<ForDeliveryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    // console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

  // const loadOrderCompleted = async (status: string) => {
  //   const params = { status: status };
  //   const response = await getOrderCompleted(params);
  //   console.log("getOrderCompleted", response);
  //   setForOrderCompleted(response.data);
  // };

  const loadOrderCompleted = async (status: string, page: any) => {
    const params = { status: status, page: page };
    const response = await getOrderCompleted(params);
    const data = response.data.filter(
      (item: any) => item.order_status === "delivered"
    );
    // console.log("getOrderCompleted", response);

    setOrders((current: any) => [...current, ...data]);
    setLastPage(response.last_page);
    setIsLoading(false);
    setForOrderCompleted(response.data);
  };

  const handleLoadMore = () => {
    // console.log("load more ...");
    loadOrderCompleted("delivered, canceled", currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const loadOrderCanceled = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCanceled(params);
    // console.log("getOrderCanceled", response);
    setForOrderCanceled(response.data);
  };

  useEffect(() => {
    // handleGetForDelivery();
    // loadOrderForDelivery("preparing");
    // loadOrderForDelivery("pending");
    loadOrderCompleted("delivered, canceled", 1);
    loadOrderCanceled("canceled");
  }, []);

  const [inputText, setInputText] = useState("");

  let inputHandler = (e: any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const navigate = useNavigate();

  const handleClickComplete = (id: any) => {
    navigate("completed/" + id);
  };

  const handleClickCancel = (id: any) => {
    // console.log("ajajaj");
    navigate("cancelled/" + id);
  };

  function CompletedModal(props: any) {
    return (
      <>
        {/* Desktop */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-none d-lg-block"
        >
          <Modal.Header closeButton className="px-4">
            <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
              COMPLETED
            </Modal.Title>
          </Modal.Header>
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
            {forOrderCompleted?.map((item, index) => {
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
          <Modal.Footer>
            {/* <button onClick={props.onHide}>Close</button> */}
          </Modal.Footer>
        </Modal>

        {/* Mobile */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-lg-none"
        >
          <Modal.Header closeButton className="px-4">
            <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
              COMPLETED
            </Modal.Title>
          </Modal.Header>
          {/* <h4>Completed</h4> */}
          <Modal.Body className={`${styles.modalBody} p-0`}>
            {forOrderCompleted?.map((item, index) => {
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
    const { show, handleClose, handleShow } = props;
    return (
      <>
        {/* Desktop */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-none d-lg-block"
        >
          <Modal.Header closeButton className="px-4">
            <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
              CANCELLED
            </Modal.Title>
          </Modal.Header>
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
            {forOrderCanceled?.map((item, index) => {
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
          <Modal.Footer>
            {/* <button onClick={props.onHide}>Close</button> */}
          </Modal.Footer>
        </Modal>

        {/* Mobile */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="d-lg-none"
        >
          <Modal.Header closeButton className="px-4">
            <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
              CANCELED
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={`${styles.modalBody} p-0`}>
            {forOrderCanceled?.map((item, index) => {
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

  //
  const [item, setItems] = React.useState();
  const [search, setSearch]: [string, (search: string) => void] =
    React.useState("");

  const handleChange = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };
  //

  const OrderItem = (item: ForCompletedItem, index: number) => {
    // console.log(search);
    const stringID = String(item.id);
    if (search && stringID.includes(search)) {
      return (
        <div className={styles.item} key={index}>
          <Row>
            <Col lg={{ span: 12 }}>
              <Row>
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

                <Col md={9}>
                  <div className={styles.orderDetails}>
                    <Row>
                      <Col>
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

                        <Row className="mb-2 mb-sm-3">
                          <Col sm={3} xs={5}>
                            <p>Delivery Address :</p>
                          </Col>
                          <Col sm={9} xs={7}>
                            <p className={styles.value}>{item.order_address}</p>
                          </Col>
                        </Row>

                        <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                          <Col>
                            <Row className="mb-2 mb-sm-0">
                              <Col xs={5} sm={6}>
                                <p>Order Placed Time: </p>
                              </Col>
                              <Col xs={7} sm={6}>
                                <p className={styles.value}>
                                  {item && getTime(item?.created_at)}
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
                                  {item.delivered_at}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row sm={2} xs={1}>
                          <Col>
                            <Row>
                              <Col xs={5} sm={6}>
                                <p>Date Ordered :</p>
                              </Col>
                              <Col xs={7} sm={6}>
                                <p className={styles.value}>
                                  {item && getTime(item?.created_at)}
                                </p>
                              </Col>
                            </Row>
                          </Col>

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
    }
    if (search.length === 0) {
      return (
        <div className={styles.item} key={index}>
          <Row>
            <Col lg={{ span: 12 }}>
              <Row>
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

                <Col md={9}>
                  <div className={styles.orderDetails}>
                    <Row>
                      <Col>
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

                        <Row className="mb-2 mb-sm-3">
                          <Col sm={3} xs={5}>
                            <p>Delivery Address :</p>
                          </Col>
                          <Col sm={9} xs={7}>
                            <p className={styles.value}>{item.order_address}</p>
                          </Col>
                        </Row>

                        <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                          <Col>
                            <Row className="mb-2 mb-sm-0">
                              <Col xs={5} sm={6}>
                                <p>Order Placed Time: </p>
                              </Col>
                              <Col xs={7} sm={6}>
                                <p className={styles.value}>
                                  {item && getTime(item?.created_at)}
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
                                  {item.delivered_at}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row sm={2} xs={1}>
                          <Col>
                            <Row>
                              <Col xs={5} sm={6}>
                                <p>Date Ordered :</p>
                              </Col>
                              <Col xs={7} sm={6}>
                                <p className={styles.value}>
                                  {item?.received_at}
                                </p>
                              </Col>
                            </Row>
                          </Col>

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
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.historyContainerHistory}>
        <div className={styles.historyHeader}>
          <div className={styles.historyHeader1}>
            <h3>History</h3>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search order ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <img src={SearchIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.innerContainer}>
        {/* {forOrderCompleted.map((item, index) => {
          console.log(search);
          const stringID = String(item.id);
          if (search && stringID.includes(search)) {
            return (
              <div className={styles.item} key={index}>
                <Row>
                 
                  <Col lg={{ span: 12 }}>
                    <Row>
                     
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

                     
                      <Col md={9}>
                        <div className={styles.orderDetails}>
                          <Row>
                            <Col>
                             
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

                              
                              <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                                <Col>
                                  <Row className="mb-2 mb-sm-0">
                                    <Col xs={5} sm={6}>
                                      <p>Order Placed Time: </p>
                                    </Col>
                                    <Col xs={7} sm={6}>
                                      <p className={styles.value}>
                                     
                                        {item && getTime(item?.created_at)}
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
                                       
                                        {item.delivered_at}
                                      </p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>

                             
                              <Row sm={2} xs={1}>
                                <Col>
                                  <Row>
                                    <Col xs={5} sm={6}>
                                      <p>Date Ordered :</p>
                                    </Col>
                                    <Col xs={7} sm={6}>
                                      <p className={styles.value}>
                                       
                                        {item && getTime(item?.created_at)}
                                      </p>
                                    </Col>
                                  </Row>
                                </Col>

                                
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
          }
          if (search.length === 0) {
            return (
              <div className={styles.item} key={index}>
                <Row>
                 
                  <Col lg={{ span: 12 }}>
                    <Row>
                     
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

                     
                      <Col md={9}>
                        <div className={styles.orderDetails}>
                          <Row>
                            <Col>
                             
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

                             
                              <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                                <Col>
                                  <Row className="mb-2 mb-sm-0">
                                    <Col xs={5} sm={6}>
                                      <p>Order Placed Time: </p>
                                    </Col>
                                    <Col xs={7} sm={6}>
                                      <p className={styles.value}>
                                       
                                        {item && getTime(item?.created_at)}
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
                                      
                                        {item.delivered_at}
                                      </p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>

                             
                              <Row sm={2} xs={1}>
                                <Col>
                                  <Row>
                                    <Col xs={5} sm={6}>
                                      <p>Date Ordered :</p>
                                    </Col>
                                    <Col xs={7} sm={6}>
                                      <p className={styles.value}>
                                       
                                        {item?.received_at}
                                      </p>
                                    </Col>
                                  </Row>
                                </Col>

                               
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
          }
          return null;
        })} */}

        <div className={styles.innerContainer2}>
          {" "}
          {orders?.length ? (
            orders?.map((item, index) => {
              return OrderItem(item, index);
            })
          ) : (
            <h5 className="text-center">No orders found.</h5>
          )}
          {orders?.length !== 0 && currentPage < lastPage && (
            <div className="text-center">
              <Button
                variant="primary"
                className={styles.btnLoadMore}
                onClick={handleLoadMore}
              >
                {!isLoading ? "Load more" : "Loading ..."}
              </Button>
            </div>
          )}
        </div>

        {forOrderCompleted.length !== 0 || forOrderCanceled.length !== 0 ? (
          <div className={`${styles.bottomBtn} mt-3`}>
            <Button onClick={() => setModalShow1(true)}>Completed</Button>
            <CompletedModal
              show={modalShow1}
              onHide={() => setModalShow1(false)}
            />
            <Button onClick={() => setModalShow2(true)}>Cancelled</Button>
            <CancelledModal
              show={modalShow2}
              onHide={() => setModalShow2(false)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderHistoryContent;
