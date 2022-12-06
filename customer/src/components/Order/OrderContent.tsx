import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useOrders } from "../../hooks/useOrders";

import statusIsReceived from "../../assets/images/order-received.png";
import statusIsPreparing from "../../assets/images/order-preparing.png";
import statusIsOtw from "../../assets/images/order-otw.png";
import statusIsDelivered from "../../assets/images/order-delivered.png";
import statusIsCancel from "../../assets/images/order-cancel.png";
import statusIsReceivedAlt from "../../assets/images/order-received-alt.png";
import statusIsPreparingAlt from "../../assets/images/order-preparing-alt.png";
import statusIsOtwAlt from "../../assets/images/order-otw-alt.png";
import statusIsDeliveredAlt from "../../assets/images/order-delivered-alt.png";
import statusIsCancelAlt from "../../assets/images/order-cancel-alt.png";

import styles from "./OrderContent.module.scss";
import constants from "../../utils/constants.json";
import RiderFeedback from "./RiderFeedback";
import Chat from "./Chat";

import Pusher from "pusher-js";
import * as PusherTypes from "pusher-js";

var presenceChannel: PusherTypes.PresenceChannel;

const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY || "";

const pusher = new Pusher(PUSHER_KEY, {
  cluster: "ap1",
});
Pusher.logToConsole = true;

interface ContainerProps {}

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
  rider_average_rating?: number;
  rider_name?: string;
  rider_photo?: string;
  rider_vehicle_brand?: string;
  rider_vehicle_model?: string;
  plate_number?: string;
};

type TRider = {
  order_id?: number;
  rider_id?: number;
  rider_name?: string;
  rider_photo?: string;
  rider_vehicle_brand?: string;
  rider_vehicle_model?: string;
  rider_average_rating?: number;
  plate_number?: string;
};

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const [modalShow, setModalShow] = useState(false);
  const [order, setOrder] = useState<TOrder>();
  const [rider, setRider] = useState<TRider>();
  const {
    getOrdersById,
    getOrdersByIdGuest,
    cancelOrderById,
    cancelOrderByIdGuest,
  } = useOrders();
  const isAuthenticated = useIsAuthenticated();

  // Get the params from the URL
  const { id } = useParams();

  const loadOrder = async () => {
    if (isAuthenticated()) {
      // Get user order
      const response = await getOrdersById(id);
      console.log("getOrdersById response", response);

      const thisRider = {
        order_id: response.id,
        rider_id: response.rider_id,
        rider_name: response.rider_name,
        rider_photo: response.rider_photo,
        rider_vehicle_brand: response.rider_vehicle_brand,
        rider_vehicle_model: response.rider_vehicle_model,
        rider_average_rating: response.rider_average_rating,
        plate_number: response.plate_number,
      };

      setOrder(response);
      setRider(thisRider);

      // Specific customer channel
      // const channel = pusher.subscribe(
      //   "Customer-Channel-" + response.customer_id
      // );

      // Specific order channel
      const channel = pusher.subscribe("Order-Channel-" + response.id);
      channel.bind("Order-Updated-Event", (data: any) => {
        const parsedData = JSON.parse(data.data);
        console.log(data);
        console.log(parsedData);

        const status = parsedData.status;

        const thisRider = {
          order_id: parsedData.id,
          rider_id: parsedData.rider_id,
          rider_name: parsedData.rider_name,
          rider_photo: parsedData.rider_photo,
          rider_vehicle_brand: parsedData.rider_vehicle_brand,
          rider_vehicle_model: parsedData.rider_vehicle_model,
          rider_average_rating: parsedData.rider_average_rating,
          plate_number: parsedData.plate_number,
        };

        setOrder({ ...parsedData, order_status: status });
        setRider(thisRider);
      });
    } else {
      // Get guest session in local storage
      const guestSession = localStorage.getItem("guestSession");

      // Get guest order
      const response = await getOrdersByIdGuest(id, guestSession);
      console.log("getOrdersByIdGuest response", response);
      setOrder(response);

      const channel = pusher.subscribe("Guest-Channel-" + response.guest_id);
      channel.bind("Order-Updated-Event", (data: any) => {
        const parsedData = JSON.parse(data.data);
        const status = parsedData.status;

        console.log("Current order", response);
        setOrder({ ...response, order_status: status });
      });
    }
  };

  const handleCancelOrder = async () => {
    console.log("Cancel order ...", id);

    const response = await cancelOrderById(id);
    console.log("cancelOrderById response", response);

    if (!response.error) {
      alert(constants.form.success.cancelOrder);

      const newOrderObj: TOrder = { ...order, order_status: "canceled" };
      setOrder(newOrderObj);
    } else {
      alert(response.error);
    }
  };

  const handleCancelOrderGuest = async () => {
    console.log("Cancel order guest ...", id);

    // Get guest session in local storage
    const guestSession = localStorage.getItem("guestSession");

    const response = await cancelOrderByIdGuest(id, guestSession);
    console.log("cancelOrderByIdGuest response", response);

    if (!response.error) {
      alert(constants.form.success.cancelOrder);

      const newOrderObj: TOrder = { ...order, order_status: "canceled" };
      setOrder(newOrderObj);
    } else {
      alert(response.error);
    }
  };

  useEffect(() => {
    loadOrder();

    // console.log(pusher);
    // pusher.connection.bind("error", function (err: any) {
    //   if (err.error.data.code === 4004) {
    //     alert("Over limit!");
    //     pusher.disconnect();
    //   }
    // });

    // if (order && order.customer_id) {
    //   const channel = pusher.subscribe("Customer-Channel-" + order.customer_id);
    //   channel.bind("Order-Updated-Event", (data: any) => {
    //     console.log(data);
    //     alert("New update");
    //   });
    // }
  }, []);

  return (
    <div className={styles.container}>
      <div className="text-center">
        <div className={styles.title}>
          <h3>Order Tracker</h3>
          <p>Please don't close the page.</p>
        </div>

        <Row md={4} xs={1}>
          <Col>
            <div className={styles.status}>
              <div className={styles.imgContainer}>
                {order?.order_status === "canceled" ? (
                  <>
                    <img src={statusIsCancel} alt="" />
                    <img
                      src={statusIsCancelAlt}
                      alt=""
                      className={styles.altImg}
                    />
                    <p>Order Canceled</p>
                  </>
                ) : (
                  <>
                    <img src={statusIsReceived} alt="" />
                    {order?.order_status === "received" && (
                      <img
                        src={statusIsReceivedAlt}
                        alt=""
                        className={styles.altImg}
                      />
                    )}
                    <p>Order Received</p>
                  </>
                )}
              </div>

              {order?.order_status === "pending" && (
                <Button
                  variant="primary"
                  className={styles.cancel}
                  onClick={
                    isAuthenticated()
                      ? handleCancelOrder
                      : handleCancelOrderGuest
                  }
                >
                  Cancel Order
                </Button>
              )}
            </div>
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
                <p>Preparing Order</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <div className={styles.imgContainer}>
                <img src={statusIsOtw} alt="" />
                {order?.order_status === "otw" && (
                  <img src={statusIsOtwAlt} alt="" className={styles.altImg} />
                )}
                <p>Rider on its way</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <div className={styles.imgContainer}>
                <img src={statusIsDelivered} alt="" />
                {order?.order_status === "delivered" && (
                  <img
                    src={statusIsDeliveredAlt}
                    alt=""
                    className={styles.altImg}
                  />
                )}
                <p>Delivered</p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Display feedback button for authenticated users ONLY & when order is DELIVERED */}
        {order?.order_status === "delivered" && isAuthenticated() && (
          <div className="mt-lg-5 mt-4">
            <Button
              variant="primary"
              className={styles.feedback}
              onClick={() => setModalShow(true)}
            >
              Restaurant Feedback
            </Button>
          </div>
        )}
      </div>

      <RiderFeedback
        modalShow={modalShow}
        setModalShow={setModalShow}
        rider={rider}
      />

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

      <div className={styles.chatContainer}>
        <Chat />
      </div>
    </div>
  );
};

export default OrderContent;
