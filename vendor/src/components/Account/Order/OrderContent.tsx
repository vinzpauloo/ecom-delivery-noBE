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
import updateSuccess from "../../../assets/update-success.json";
import searchIcon from "../../../assets/images/searchIcon.png";
import orderReceived from "../../../assets/images/order-received.png";
import orderReceivedAlt from "../../../assets/images/order-received-alt.png";
import kitchenPrep from "../../../assets/images/kitchen-prep.png";
import kitchenPrepAlt from "../../../assets/images/order-preparing-alt.png";
import riderOTW from "../../../assets/images/rider-on-the-way.png";
import riderOtwAlt from "../../../assets/images/order-otw-alt.png";
import riderDelivered from "../../../assets/images/delivered.png";
import riderDeliveredAlt from "../../../assets/images/order-delivered-alt.png";

import { getDate, getTime } from "../../../utils/formatDate";

import styles from "./OrderContent.module.scss";
import Lottie from "lottie-react";

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
  products: [{ name: string; quantity: number; flavor_name: string }];
  total_amount: number;
  updated_at: string;
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
  const {
    // getCurrentOrder,
    getForDeliveryOTW,
    // getOrderCompleted,
    // getOrderCanceled,
  } = useGetOrderStatus();
  const { updateOrder, cancelOrder, getOrdersById } = useOrder();

  // const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);
  // const [forOtw, setForOtw] = useState<ForOtwItem[]>([]);
  // const [modalShow1, setModalShow1] = React.useState(false);
  // const [modalShow2, setModalShow2] = React.useState(false);
  // const [deliveredItem, setDeliveredItem] = useState<GetDeliveredItem[]>([]);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [productItem, setProductItem] = useState<TOrder>();
  const [search, setSearch] = useState("");
  const [updateModalShow, setUpdateModalShow] = useState({
    status: false,
    ID: "",
  });
  const [isShown, setIsShown] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    loadOrderForDelivery("preparing, otw, pending, received", currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  // const loadPendingOrder = async (status: string) => {
  //   const params = { status: status };
  //   const response = await getCurrentOrder(params);
  //   console.log("getForDelivery", response);
  //   setForDelivery(response.data);
  //   console.log(response.data);
  // };

  // const loadOrders = async (page: number) => {
  //   const response = await getOrders({ page });
  //   console.log("!!!",response)
  //   const data = response.data.filter(item => (item.order_status !== "delivered"))
  //   setOrders((current:any) => [...current, ...data]);
  //   setLastPage(response.last_page);
  //   setIsLoading(false);
  // };

  const navigate = useNavigate();

  // Get the params from the url
  const { id } = useParams();

  const handleAccept = async (id: string) => {
    setUpdateModalShow({ status: true, ID: id });
    const response = await updateOrder(id, "received");
    // navigate(`/account/order/status/${id}`);
  };

  const handleClick = (e: any) => {
    setIsShown((current) => !current);
  };

  // const loadDeliveredItem = async (status: string) => {
  //   const params = { status: status };
  //   const response = await getOrderCompleted(params);
  //   console.log("getOrderCompleted", response);

  //   setDeliveredItem(response.data);
  // };

  function CustomToggle({ children, eventKey }: any) {
    const handleClickItem = async (props) => {
      const response = await getOrdersById(props);
      console.log("getOrdersById response", response);
      setProductItem(response);
    };

    const decoratedOnClick = useAccordionButton(eventKey, () => {
      handleClick(eventKey);
      handleClickItem(eventKey);
    });

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

  const loadOrderForDelivery = async (status: string, page) => {
    const params = { status: status, page: page };
    const response = await getForDeliveryOTW(params);
    const data = response.data.filter(
      (item) => item.order_status !== "delivered"
    );
    setOrders((current: any) => [...current, ...data]);
    setLastPage(response.last_page);
    setIsLoading(false);
  };

  const handleClickItem = async (props) => {
    const response = await getOrdersById(props);
    console.log("getOrdersById response", response);
    setProductItem(response);
  };

  const handleClickStatus = (id: number) => {
    navigate(`/account/order/status/${id}`);
  };

  // const handleClickComplete = (id) => {
  //   navigate("completed/" + id);
  // };
  // const handleClickCancel = (id) => {
  //   console.log("ajajaj");
  //   navigate("cancelled/" + id);
  // };

  // function CompletedModal(props: any) {
  //   return (
  //     <>
  //       <Modal
  //         {...props}
  //         size="lg"
  //         aria-labelledby="contained-modal-title-vcenter"
  //         centered
  //         className="d-none d-lg-block"
  //       >
  //         <Modal.Body className={`${styles.modalBody} p-0`}>
  //           <Container>
  //             <Row className={styles.modalHeaderContent}>
  //               <Col className={styles.modalHeader}>Order ID</Col>
  //               <Col className={styles.modalHeader}>Date</Col>
  //               <Col className={styles.modalHeader}>Order Placed Time</Col>
  //               <Col className={styles.modalHeader}>Order Delivered</Col>
  //               <Col className={styles.modalHeader}>Rider Name</Col>
  //             </Row>
  //           </Container>
  //           {deliveredItem?.map((item, index) => {
  //             return (
  //               <Container
  //                 className={`${styles.orderDeliveryContainer} d-flex flex-column gap-2`}
  //                 // className="order-delivery-container d-flex flex-column gap-2"
  //                 fluid
  //                 key={index}
  //               >
  //                 <Row
  //                   className={styles.modalRow}
  //                   onClick={() => handleClickComplete(item.id)}
  //                 >
  //                   <Col className={styles.modalHeader}>{item.id}</Col>
  //                   <Col className={styles.modalHeader}>
  //                     {item.created_at.slice(0, 10)}
  //                   </Col>
  //                   <Col className={styles.modalHeader}>
  //                     {item.created_at.slice(12, 19)}
  //                   </Col>
  //                   <Col className={styles.modalHeader}>
  //                     {item.updated_at.slice(0, 10)}
  //                   </Col>
  //                   <Col className={styles.modalHeader}>{item.rider_name}</Col>
  //                 </Row>
  //               </Container>
  //             );
  //           })}
  //         </Modal.Body>
  //       </Modal>
  //       <Modal
  //         {...props}
  //         size="lg"
  //         aria-labelledby="contained-modal-title-vcenter"
  //         centered
  //         className="d-lg-none"
  //       >
  //         <h4>Completed</h4>
  //         <Modal.Body className={`${styles.modalBody} p-0`}>
  //           {deliveredItem?.map((item, index) => {
  //             return (
  //               <Container
  //                 className={styles.orderDeliveryContainer}
  //                 fluid
  //                 key={index}
  //               >
  //                 <Row
  //                   className={styles.contentContainer}
  //                   onClick={() => handleClickComplete(item.id)}
  //                 >
  //                   <Col className={`col-3 ${styles.idContent}`}>
  //                     <Row>
  //                       <Col className={styles.modalHeader}>Order ID</Col>
  //                     </Row>
  //                     <Row>
  //                       <Col className={styles.modalHeaderLabel}>{item.id}</Col>
  //                     </Row>
  //                   </Col>
  //                   <Col className="col-9">
  //                     <Row className={styles.row}>
  //                       <Col>
  //                         <Row className={styles.lable}>Date</Row>
  //                         <Row className={styles.lable}>
  //                           {item.created_at.slice(0, 10)}
  //                         </Row>
  //                       </Col>
  //                       <Col>
  //                         <Row className={styles.lable}>Order Placed Time</Row>
  //                         <Row className={styles.lable}>
  //                           {item.created_at.slice(12, 19)}
  //                         </Row>
  //                       </Col>
  //                     </Row>
  //                     <Row className={styles.row}>
  //                       <Col>
  //                         <Row className={styles.lable}>Rider Name</Row>
  //                         <Row className={styles.lable}>{item.rider_name}</Row>
  //                       </Col>
  //                       <Col>
  //                         <Row className={styles.lable}>Order Delivered</Row>
  //                         <Row className={styles.lable}>
  //                           {item.updated_at.slice(0, 10)}
  //                         </Row>
  //                       </Col>
  //                     </Row>
  //                   </Col>
  //                 </Row>
  //               </Container>
  //             );
  //           })}
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   );
  // }

  // function CancelledModal(props: any) {
  //   return (
  //     <>
  //       <Modal
  //         {...props}
  //         size="lg"
  //         aria-labelledby="contained-modal-title-vcenter"
  //         centered
  //         className="d-none d-lg-block"
  //       >
  //         <Modal.Body className={`${styles.modalBody} p-0`}>
  //           <Container>
  //             <Row className={styles.modalHeaderContent}>
  //               <Col className={styles.modalHeader}>Order ID</Col>
  //               <Col className={styles.modalHeader}>Date</Col>
  //               <Col className={styles.modalHeader}>Order Placed Time</Col>
  //               <Col className={styles.modalHeader}>Time Cancelled</Col>
  //               <Col className={styles.modalHeader}>Rider Name</Col>
  //             </Row>
  //           </Container>
  //           {deliveredItem?.map((item, index) => {
  //             return (
  //               <Container
  //                 className={`${styles.orderDeliveryContainer} d-flex flex-column gap-2`}
  //                 // className="order-delivery-container d-flex flex-column gap-2"
  //                 fluid
  //                 key={index}
  //               >
  //                 <Row
  //                   className={styles.modalRow}
  //                   onClick={() => handleClickCancel(item.id)}
  //                 >
  //                   <Col className={styles.modalHeader}>{item.id}</Col>
  //                   <Col className={styles.modalHeader}>
  //                     {item.created_at.slice(0, 10)}
  //                   </Col>
  //                   <Col className={styles.modalHeader}>
  //                     {item.created_at.slice(12, 19)}
  //                   </Col>
  //                   <Col className={styles.modalHeader}>
  //                     {item.updated_at.slice(0, 10)}
  //                   </Col>
  //                   <Col className={styles.modalHeader}>{item.rider_name}</Col>
  //                 </Row>
  //               </Container>
  //             );
  //           })}
  //         </Modal.Body>
  //       </Modal>
  //       <Modal
  //         {...props}
  //         size="lg"
  //         aria-labelledby="contained-modal-title-vcenter"
  //         centered
  //         className="d-lg-none"
  //       >
  //         <h4>Cancelled</h4>
  //         <Modal.Body className={`${styles.modalBody} p-0`}>
  //           {deliveredItem?.map((item, index) => {
  //             return (
  //               <Container
  //                 className={styles.orderDeliveryContainer}
  //                 fluid
  //                 key={index}
  //               >
  //                 <Row
  //                   className={styles.contentContainer}
  //                   onClick={() => handleClickCancel(item.id)}
  //                 >
  //                   <Col className={`col-3 ${styles.idContent}`}>
  //                     <Row>
  //                       <Col className={styles.modalHeader}>Order ID</Col>
  //                     </Row>
  //                     <Row>
  //                       <Col className={styles.modalHeaderLabel}>{item.id}</Col>
  //                     </Row>
  //                   </Col>
  //                   <Col className="col-9">
  //                     <Row className={styles.row}>
  //                       <Col>
  //                         <Row className={styles.lable}>Date</Row>
  //                         <Row className={styles.lable}>
  //                           {item.created_at.slice(0, 10)}
  //                         </Row>
  //                       </Col>
  //                       <Col>
  //                         <Row className={styles.lable}>Order Placed Time</Row>
  //                         <Row className={styles.lable}>
  //                           {item.created_at.slice(12, 19)}
  //                         </Row>
  //                       </Col>
  //                     </Row>
  //                     <Row className={styles.row}>
  //                       <Col>
  //                         <Row className={styles.lable}>Rider Name</Row>
  //                         <Row className={styles.lable}>{item.rider_name}</Row>
  //                       </Col>
  //                       <Col>
  //                         <Row className={styles.lable}>Order Delivered</Row>
  //                         <Row className={styles.lable}>
  //                           {item.updated_at.slice(0, 10)}
  //                         </Row>
  //                       </Col>
  //                     </Row>
  //                   </Col>
  //                 </Row>
  //               </Container>
  //             );
  //           })}
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   );
  // }

  useEffect(() => {
    // loadPendingOrder("pending");
    loadOrderForDelivery("preparing, otw, pending, received", 1);
    // loadDeliveredItem("delivered");
    // loadOrders(1);
  }, []);

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
              {/* <Col className={styles.buttonContent}>
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
              </Col> */}
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
        {/* Mapping of Orders*/}
        {search !== "" ? (
          orders
            ?.filter((item) =>
              item.id
                .toString()
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
            .map((item, index) => {
              return (
                <Accordion className={styles.test} flush key={index}>
                  <Accordion.Item eventKey={`${item.id}`}>
                    <div className={styles.orderDiv}>
                      <CustomToggle eventKey={`${item.id}`}>
                        Order ID: {item.id}
                      </CustomToggle>
                      <div className="d-md-none" style={{ display: "flex" }}>
                        <div
                          className="d-md-none"
                          onClick={() => handleClickItem(item.id)}
                        >
                          <CustomToggle2 eventKey={`${item.id}`}>
                            View Details
                          </CustomToggle2>
                        </div>
                        <div
                          className="d-md-none"
                          onClick={() => handleClickStatus(item.id)}
                          style={{ marginLeft: "5px" }}
                        >
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
                          >
                            Status
                          </button>
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
                            Pick-up address:{" "}
                            <span>{item.restaurant_address}</span>
                          </p>
                        </Row>
                        <Row>
                          <p>
                            Delivery Address: <span>{item.order_address}</span>
                          </p>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                              Order Placed Time:{" "}
                              <span>{getTime(item.created_at)}</span>
                            </p>
                          </Col>
                          <Col>
                            <p>
                              Order Delivered Time:{" "}
                              <span>{getTime(item.updated_at)}</span>
                            </p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <p>Order Details:</p>
                            <ul>
                              {productItem?.products.map((item, index) => (
                                <li key={index}>{`${item.quantity}pcs ${
                                  item.name
                                } ${
                                  item.flavor_name
                                    ? `(${item.flavor_name})`
                                    : ""
                                }`}</li>
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
                              Sub Total: <span>{item.total_amount} php</span>
                            </p>
                            <p>
                              Delivery Fee: <span>85 php</span>
                            </p>
                            <p>
                              Total: <span>{item.total_amount} php</span>
                            </p>
                          </Col>
                          <Col>
                            <div className={styles.status}>
                              <p>Order Status</p>
                              <div className={styles.status2}>
                                <div className={styles.imgContainer2}>
                                  {item?.order_status === "pending" && (
                                    <img src={orderReceived} alt="" />
                                  )}
                                  {item?.order_status === "pending" && (
                                    <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                      <img
                                        src={orderReceivedAlt}
                                        alt=""
                                        className={styles.altImg2}
                                      />
                                      {/* <p
                                        style={{
                                          textTransform: "uppercase",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Pending
                                      </p> */}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={styles.status2}>
                                <div className={styles.imgContainer2}>
                                  {item?.order_status === "preparing" && (
                                    <img src={kitchenPrep} alt="" />
                                  )}
                                  {item?.order_status === "preparing" && (
                                    <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                      <img
                                        src={kitchenPrepAlt}
                                        alt=""
                                        className={styles.altImg2}
                                      />
                                      {/* <p
                                        style={{
                                          textTransform: "uppercase",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Kitchen Preparing...
                                      </p> */}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={styles.status2}>
                                <div className={styles.imgContainer2}>
                                  {item?.order_status === "otw" && (
                                    <img src={riderOTW} alt="" />
                                  )}
                                  {item?.order_status === "otw" && (
                                    <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                      <img
                                        src={riderOtwAlt}
                                        alt=""
                                        className={styles.altImg2}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                              {item?.order_status === "delivered" && (
                                <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                  <img src={riderDelivered} alt="" />
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
                          {item?.order_status === "pending" ? (
                            <Button onClick={() => handleAccept(`${item.id}`)}>
                              Accept
                            </Button>
                          ) : null}
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
                            Customer Name: <span>{item.customer_name}</span>
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
                          Pick-up address:{" "}
                          <span>{item.restaurant_address}</span>
                        </p>
                      </Row>
                      <Row>
                        <p>
                          Delivery Address: <span>{item.order_address}</span>
                        </p>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            Order Placed Time:{" "}
                            <span>{getTime(item.created_at)}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Order Delivered Time:{" "}
                            <span>{getTime(item.updated_at)}</span>
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
                          Pick-up address:{" "}
                          <span>{item.restaurant_address}</span>
                        </p>
                      </Row>
                      <Row className="p-1">
                        <p>
                          Delivery Address: <span>{item.order_address}</span>
                        </p>
                      </Row>
                      <Row className="p-1">
                        <Col>
                          <p>
                            Order Placed Time:{" "}
                            <span>{getTime(item.created_at)}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Order Delivered Time:{" "}
                            <span>{getTime(item.updated_at)}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Col
                          className="d-none d-md-flex"
                          // md={{ span: 5, offset: 5 }}
                          style={{ justifyContent: "flex-end" }}
                          onClick={() => handleClickItem(item.id)}
                        >
                          <CustomToggle2 eventKey={`${item.id}`}>
                            View Details
                          </CustomToggle2>
                        </Col>
                        <Col
                          className="d-none d-md-flex"
                          // md={{ span: 7, offset: 5 }}
                          onClick={() => handleClickStatus(item.id)}
                        >
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
                          >
                            Status
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Accordion>
              );
            })
        ) : orders.length !== 0 ? (
          orders.map((item, index) => {
            return (
              <Accordion className={styles.test} flush key={index}>
                <Accordion.Item eventKey={`${item.id}`}>
                  <div className={styles.orderDiv}>
                    <CustomToggle eventKey={`${item.id}`}>
                      Order ID: {item.id}
                    </CustomToggle>
                    <div className="d-md-none" style={{ display: "flex" }}>
                      <div
                        className="d-md-none"
                        onClick={() => handleClickItem(item.id)}
                      >
                        <CustomToggle2 eventKey={`${item.id}`}>
                          View Details
                        </CustomToggle2>
                      </div>
                      <div
                        className="d-md-none"
                        onClick={() => handleClickStatus(item.id)}
                        style={{ marginLeft: "5px" }}
                      >
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
                        >
                          Status
                        </button>
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
                            Contact Number: <span>{item.customer_mobile}</span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          Pick-up address:{" "}
                          <span>{item.restaurant_address}</span>
                        </p>
                      </Row>
                      <Row>
                        <p>
                          Delivery Address: <span>{item.order_address}</span>
                        </p>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            Order Placed Time:{" "}
                            <span>{getTime(item.created_at)}</span>
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Order Delivered Time:{" "}
                            <span>{getTime(item.updated_at)}</span>
                          </p>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <p>Order Details:</p>
                          <ul>
                            {productItem?.products.map((item, index) => (
                              <li key={index}>{`${item.quantity}pcs ${
                                item.name
                              } ${
                                item.flavor_name ? `(${item.flavor_name})` : ""
                              }`}</li>
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
                            Sub Total: <span>{item.total_amount} php</span>
                          </p>
                          <p>
                            Delivery Fee: <span>85 php</span>
                          </p>
                          <p>
                            Total: <span>{item.total_amount} php</span>
                          </p>
                        </Col>
                        <Col>
                          <div className={styles.status}>
                            <p>Order Status</p>
                            <div className={styles.status2}>
                              <div className={styles.imgContainer2}>
                                {item?.order_status === "pending" && (
                                  <img src={orderReceived} alt="" />
                                )}
                                {item?.order_status === "pending" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img
                                      src={orderReceivedAlt}
                                      alt=""
                                      className={styles.altImg2}
                                    />
                                    {/* <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Pending
                                    </p> */}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className={styles.status2}>
                              <div className={styles.imgContainer2}>
                                {item?.order_status === "preparing" && (
                                  <img src={kitchenPrep} alt="" />
                                )}
                                {item?.order_status === "preparing" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img
                                      src={kitchenPrepAlt}
                                      alt=""
                                      className={styles.altImg2}
                                    />
                                    {/* <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Kitchen Preparing...
                                    </p> */}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className={styles.status2}>
                              <div className={styles.imgContainer2}>
                                {item?.order_status === "otw" && (
                                  <img src={riderOTW} alt="" />
                                )}
                                {item?.order_status === "otw" && (
                                  <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                    <img
                                      src={riderOtwAlt}
                                      alt=""
                                      className={styles.altImg2}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            {item?.order_status === "delivered" && (
                              <div className="d-flex flex-column justify-content-center align-content-center align-items-center text-center">
                                <img src={riderDelivered} alt="" />
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
                        {item?.order_status === "pending" ? (
                          <Button onClick={() => handleAccept(`${item.id}`)}>
                            Accept
                          </Button>
                        ) : null}
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
                          Customer Name: <span>{item.customer_name}</span>
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
                        Pick-up address: <span>{item.restaurant_address}</span>
                      </p>
                    </Row>
                    <Row>
                      <p>
                        Delivery Address: <span>{item.order_address}</span>
                      </p>
                    </Row>
                    <Row>
                      <Col>
                        <p>
                          Order Placed Time:{" "}
                          <span>{getTime(item.created_at)}</span>
                        </p>
                      </Col>
                      <Col>
                        <p>
                          Order Delivered Time:{" "}
                          <span>{getTime(item.updated_at)}</span>
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
                        Pick-up address: <span>{item.restaurant_address}</span>
                      </p>
                    </Row>
                    <Row className="p-1">
                      <p>
                        Delivery Address: <span>{item.order_address}</span>
                      </p>
                    </Row>
                    <Row className="p-1">
                      <Col>
                        <p>
                          Order Placed Time:{" "}
                          <span>{getTime(item.created_at)}</span>
                        </p>
                      </Col>
                      <Col>
                        <p>
                          Order Delivered Time:{" "}
                          <span>{getTime(item.updated_at)}</span>
                        </p>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Col
                        className="d-none d-md-flex"
                        // md={{ span: 5, offset: 5 }}
                        style={{ justifyContent: "flex-end" }}
                        onClick={() => handleClickItem(item.id)}
                      >
                        <CustomToggle2 eventKey={`${item.id}`}>
                          View Details
                        </CustomToggle2>
                      </Col>
                      <Col
                        className="d-none d-md-flex"
                        // md={{ span: 7, offset: 5 }}
                        onClick={() => handleClickStatus(item.id)}
                      >
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
                        >
                          Status
                        </button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Accordion>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center", margin: "30px 0 0" }}>
            No orders found.
          </h2>
        )}
      </div>
      {orders?.length !== 0 && currentPage < lastPage && search === "" && (
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
      {/* <Col className={`${styles.mobileButtonContent} d-lg-none w-100`}>
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
      </Col> */}
      <UpdateSuccessModal
        show={updateModalShow.status}
        onHide={() => setUpdateModalShow({ status: false, ID: "" })}
        setUpdateModalShow={setUpdateModalShow}
        updateModalShow={updateModalShow}
      />
    </>
  );
};

const UpdateSuccessModal = (props: any) => {
  const { setUpdateModalShow, updateModalShow } = props;

  const handleClick = async () => {
    setUpdateModalShow({ status: false, ID: "" });
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4`}>
          <Lottie animationData={updateSuccess} loop={true} />
          <p className="mt-4" style={{ fontWeight: "400" }}>
            You have accepted this order
          </p>

          <Link
            to={`/account/order/status/${updateModalShow.ID}`}
            onClick={handleClick}
            className={`d-inline-block mt-2`}
            style={{
              background: "#e6b325",
              border: "none",
              borderRadius: "5px",
              color: "black",
              fontSize: "16px",
              fontWeight: "300",
              width: "180px",
              padding: "6px",
              textDecoration: "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Next
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderContent;
