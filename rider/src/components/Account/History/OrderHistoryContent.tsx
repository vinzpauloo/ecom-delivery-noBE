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
import { useRiderOTW } from "../../../hooks/useRiderOTW";
import constants from "../../../utils/constants.json";

import styles from "./OrderHistoryContent.module.scss";

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

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    console.log("getForDelivery", response);
    setForDelivery(response.data);
  };

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

  const [inputText, setInputText] = useState("");
  let inputHandler = (e: any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

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
          {forOrderCompleted?.map((item, index) => {
            return (
              <Container
                className={`${styles.orderDeliveryContainer} d-flex flex-column gap-2`}
                // className="order-delivery-container d-flex flex-column gap-2"
                fluid
                key={index}
              >
                <Table size="sm">
                  <thead className={styles.tableHead}>
                    <tr className={styles.tableHeader}>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Order Placed Time</th>
                      <th>Ordered Delivered</th>
                      <th>Rider Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.orderId}>{item.id}</td>
                      <td>{item.created_at.split(".")[0].slice(0, -3)}</td>
                      <td>{item.created_at.split(".")[0].slice(0, -3)}</td>
                      <td>{item.delivered_at.split(".")[0].slice(0, -3)}</td>
                      <td>{item.rider_name}</td>
                    </tr>
                  </tbody>
                </Table>
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
    const { show, handleClose, handleShow } = props;
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
          {forOrderCanceled?.map((item, index) => {
            return (
              <Container
                className={`${styles.orderDeliveryContainer} d-flex flex-column gap-2`}
                // className="order-delivery-container d-flex flex-column gap-2"
                fluid
                key={index}
              >
                <Table size="sm">
                  <thead className={styles.tableHead}>
                    <tr className={styles.tableHeader}>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Order Placed Time</th>
                      <th>Ordered Delivered</th>
                      <th>Rider Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.orderId}>{item.id}</td>
                      <td>{item.created_at.split(".")[0].slice(0, -3)}</td>
                      <td>{item.created_at.split(".")[0].slice(0, -3)}</td>
                      <td>{item.delivered_at}</td>
                      <td>{item.rider_name}</td>
                    </tr>
                  </tbody>
                </Table>
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
        {/* <Form>
          <Row className="">
            <Col>
              <Form.Control
                className={styles.searchBar}
                type="text"
                placeholder="Search food and description"
              />
            </Col>
          </Row>
        </Form> */}
        {forOrderCompleted.map((item, index) => {
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
                                    <p>Order Placed Time: </p>
                                  </Col>
                                  <Col xs={7} sm={6}>
                                    <p className={styles.value}>
                                      {/* {getTime(item.created_at)} */}
                                      {item.created_at
                                        .split(".")[0]
                                        .slice(0, -3)}
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
                                      {item.delivered_at
                                        .split(".")[0]
                                        .slice(0, -3)}
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
                                      {item.created_at
                                        .split(".")[0]
                                        .slice(0, -3)}
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
        <div className={styles.bottomBtn}>
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
      </div>
    </div>
  );
};

export default OrderHistoryContent;
