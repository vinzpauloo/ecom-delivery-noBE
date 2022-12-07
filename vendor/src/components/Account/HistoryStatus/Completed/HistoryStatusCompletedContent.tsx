import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./HistoryStatusCompletedContent.module.scss";
import { useOrder } from "../../../../hooks/useOrder";
import imgs from "../../../../assets/images/kitchen-prep.png";
import delivered from "../../../../assets/images/delivered.png";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Grid } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/scss/grid";

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
  total_amount: number;
  products: products[];
};

type products = {
  name: string;
  quantity: number;
  photo: string;
  price: number;
};

const SwiperSlideItem = () => {
  return (
    <SwiperSlide style={{ height: "100px", border: "2px solid" }}>
      {/* <div className={styles.imageContainer}> */}
      <img src={imgs} style={{ width: "100%", height: "100%" }} alt="" />
      {/* <p>title</p> 
        <p>price</p>
      </div> */}
    </SwiperSlide>
  );
};

const HistoryStatusContent = (props) => {
  const { id } = useParams();
  const { getOrdersById } = useOrder();
  const [deliveredItem, setDeliveredItem] = useState<GetDeliveredItem>();
  const [quantity, setQuantity] = useState(0);

  const loadDeliveredItem = async () => {
    const response = await getOrdersById(id);
    console.log("getOrderCompleted", response);
    setDeliveredItem(response);
    setQuantity(prev => {
      let value = prev;
      response?.products.map((item) => value += item.quantity)
      return value;
    })
  };

  useEffect(() => {
    loadDeliveredItem();
  }, []);
  console.log("!!!", deliveredItem)
  return (
    <Container fluid className={`${styles.mainContainer} pe-0 m`}>
      <div className={styles.headerContainer}>
        <Row>
          <h1 className={styles.header}>Completed Orders</h1>
        </Row>
      </div>
      <Row>
        <Col>
          <Row className={styles.titleContent}>
            <h1 className={styles.title}>{deliveredItem?.restaurant_name}</h1>
          </Row>
          <Row className={`mt-2 ps-0 ${styles.forMobile}`}>
            <Col className={`ps-0 col-7 ${styles.forMobileRow}`}>
              <div className={styles.leftContainer}>
                <h1 className={`d-none d-lg-block ${styles.id}`}>Order ID : {deliveredItem?.id}</h1>
                <h1 className={`d-lg-none ${styles.id}`}>Ordered Items</h1>
                <Swiper
                  modules={[Grid]}
                  spaceBetween={15}
                  slidesPerView={3}
                  grid={{
                    rows: 2,
                  }}
                  className={`d-none d-lg-block ${styles.imagesContainer}`}
                >
                  {deliveredItem?.products.map((item, index) => (
                    <SwiperSlide className={styles.imageContainer} key={index}>
                      <img
                        src={item.photo}
                        style={{ width: "100%", height: "100%" }}
                        alt=""
                      />
                      <p>{item.name}</p>
                      <p>{item.price}php</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  modules={[Navigation, Grid]}
                  spaceBetween={5}
                  slidesPerView={3}
                  pagination
                  className={`d-lg-none ${styles.imagesContainer}`}
                >
                  {deliveredItem?.products.map((item, index) => (
                    <SwiperSlide className={styles.imageContainer} key={index}>
                      <img src={item.photo} 
                        style={{ width: "100%" }}
                        alt="" />
                      <p>{item.name}</p>
                      <p>{item.price} php</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
            <Col className={`${styles.rightContainer} col-5`}>
              <Row className={styles.topContent}>
                <div className={styles.topContentOrderId}>
                  Order ID : {deliveredItem?.id}
                </div>
                <div className={styles.topContentOrderTitle}>
                  {deliveredItem?.restaurant_name}
                </div>
                <Row>
                  <Col className={styles.topContentOrderLeft}>
                    <Row className={styles.address}>
                      <h4>Delivery Address</h4>
                      <p>{deliveredItem?.order_address}</p>
                    </Row>
                    <Row className={styles.items}>
                      <h4>Items</h4>
                      {deliveredItem?.products.map((item, index) => {
                        return (
                          <p key={index}>
                            {item.quantity}x {item.name}
                          </p>
                        );
                      })}
                    </Row>
                  </Col>
                  <Col className={styles.topContentOrderRight}>
                    <h6 className={styles.status}>Order Status</h6>
                    <img src={delivered} alt="" />
                    <h6 className={styles.orderReceived}>
                      {deliveredItem?.order_status}
                    </h6>
                    <div className={styles.grandTotalContainer}>
                      <p className={styles.grand}>Grand Total</p>
                      <p>{deliveredItem?.total_amount} php</p>
                    </div>
                  </Col>
                </Row>
                <Row className={styles.riderContent}>
                  <p className={styles.assignedRider}>Assigned Rider</p>
                  <p className={styles.rider}>{deliveredItem?.rider_name}</p>
                </Row>
              </Row>
              <Row className={styles.bottomContent}>
                <h4>PROMO CODE</h4>
                <h3>Order Amount</h3>
                <div>
                  <p>
                    <span>Item count</span>
                    <span>{quantity}</span>
                  </p>
                  <p>
                    <span>Sub-Total</span>
                    <span>{deliveredItem?.total_amount} php</span>
                  </p>
                  <p>
                    <span>Delivery fee</span>
                    <span>86 php</span>
                  </p>
                </div>
                <p className={styles.bottomOrder}>
                  <span>Total</span>
                  <span>{deliveredItem?.total_amount} php</span>
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HistoryStatusContent;
