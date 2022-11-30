import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import styles from "./HistoryStatusCompletedContent.module.scss";
import { useGetOrderStatus } from "../../../../hooks/useGetOrderStatus";
import imgs from "../../../../assets/images/kitchen-prep.png";

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

const HistoryStatusContent = (props) => {
    const {id} = useParams();
    const { getReceived, getAllOrders, getOrderCompleted, getOrderCanceled } = useGetOrderStatus();
    const [deliveredItem, setDeliveredItem] = useState<GetDeliveredItem[]>([]);

    const loadDeliveredItem = async (status: string) => {
      const params = { status: status };
      const response = await getOrderCompleted(params);
      console.log("getOrderCompleted", response);
      setDeliveredItem(response.data);
    };

    useEffect(() => {
      loadDeliveredItem("delivered");
    }, []);

  return (
    <Container className='pe-0 m'>
      <Row>
        <h1 className={styles.header}>
          Completed Orders
        </h1>
      </Row>
      <Row>
        <Col>
          <Row>
            <h1 className={styles.title}>Header</h1>
          </Row>
          <Row className='mt-2 ps-0'>
            <Col className='ps-0 col-7'>
              <div className={styles.leftContainer}>
                <h1 className={styles.id}>Order Id</h1>
                <div className={styles.imagesContainer}>
                  <div className={styles.imageContainer}>
                    <img src={imgs}/>
                    <p>title</p>
                    <p>price</p>
                  </div>
                  <div className={styles.imageContainer}>
                    <img src={imgs}/>
                    <p>title</p>
                    <p>price</p>
                  </div>
                  <div className={styles.imageContainer}>
                    <img src={imgs}/>
                    <p>title</p>
                    <p>price</p>
                  </div>
                  <div className={styles.imageContainer}>
                    <img src={imgs}/>
                    <p>title</p>
                    <p>price</p>
                  </div>
                  <div className={styles.imageContainer}>
                    <img src={imgs}/>
                    <p>title</p>
                    <p>price</p>
                  </div>
                  <div className={styles.imageContainer}>
                    <img src={imgs}/>
                    <p>title</p>
                    <p>price</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col  className={`${styles.rightContainer} pe-0 col-5`}>
              <Row className={styles.topContent}>
                <Row>ORDER ID : 4546</Row>
                <Row>FOOD TITLE</Row>
                <Row>
                  <Col>left</Col>
                  <Col>rightContainer</Col>
                </Row>
              </Row>
              <Row className={styles.bottomContent}>
              dsf
              </Row>
              
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default HistoryStatusContent