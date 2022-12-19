import React, { useEffect, useState } from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useOrders } from "../../hooks/useOrders";

import Lottie from "lottie-react";
import otpSuccess from "../../assets/otp-success.json";

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
// Pusher.logToConsole = true;

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
  rider_rating?: number;
};

type TChat = {
  created_at?: string;
  from?: string;
  message?: string;
  to?: string;
};

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalCancelShow, setModalCancelShow] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [restaurantChatroom, setRestaurantChatroom] = useState("");
  const [riderChatroom, setRiderChatroom] = useState("");
  const [order, setOrder] = useState<TOrder>();
  const [rider, setRider] = useState<TRider>();
  const [restaurantChat, setRestaurantChat] = useState<TChat[]>();
  const [riderChat, setRiderChat] = useState<TChat[]>();
  const {
    getOrdersById,
    getOrdersByIdGuest,
    cancelOrderById,
    cancelOrderByIdGuest,
  } = useOrders();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  // Get the params from the URL
  const { id } = useParams();

  const loadOrder = async () => {
    if (isAuthenticated()) {
      // Get user order
      const response = await getOrdersById(id);
      // console.log("getOrdersById response", response);

      const thisRider = {
        order_id: response.id,
        rider_id: response.rider_id,
        rider_name: response.rider_name,
        rider_photo: response.rider_photo,
        rider_vehicle_brand: response.rider_vehicle_brand,
        rider_vehicle_model: response.rider_vehicle_model,
        rider_rating: response.rider_rating,
        rider_average_rating: response.rider_average_rating,
        plate_number: response.plate_number,
      };

      setOrder(response);
      setOrderStatus(response.order_status);
      setRider(thisRider);

      if (
        response.order_status != "canceled" &&
        response.order_status != "delivered"
      ) {
        // Initialize order channel
        const orderRoom = `Order-Channel-${response.id}`;
        initializeOrderChannel(orderRoom);

        // Initialize chat channel for merchant
        const merchantChatRoom = `ChatRoom-C${response.customer_id}-M${response.restaurant_id}`;
        initializeChatChannel(
          merchantChatRoom,
          setRestaurantChat,
          setRestaurantChatroom
        );

        if (response.rider_id) {
          // Initialize chat channel for rider
          const riderChatRoom = `ChatRoom-C${response.customer_id}-R${response.rider_id}`;
          initializeChatChannel(riderChatRoom, setRiderChat, setRiderChatroom);
        }
      }
    } else {
      // Get guest session in local storage
      const guestSession = localStorage.getItem("guestSession");

      // Get guest order
      const response = await getOrdersByIdGuest(id, guestSession);
      // console.log("getOrdersByIdGuest response", response);

      const thisRider = {
        order_id: response.id,
        rider_id: response.rider_id,
        rider_name: response.rider_name,
        rider_photo: response.rider_photo,
        rider_vehicle_brand: response.rider_vehicle_brand,
        rider_vehicle_model: response.rider_vehicle_model,
        rider_rating: response.rider_rating,
        rider_average_rating: response.rider_average_rating,
        plate_number: response.plate_number,
      };

      setOrder(response);
      setOrderStatus(response.order_status);
      setRider(thisRider);

      if (
        response.order_status != "canceled" &&
        response.order_status != "delivered"
      ) {
        // Initialize order channel
        const orderRoom = `Order-Channel-${response.id}`;
        initializeOrderChannel(orderRoom);

        // Initialize chat channel for merchant
        const merchantChatRoom = `ChatRoom-G${response.guest_id}-M${response.restaurant_id}`;
        initializeChatChannel(
          merchantChatRoom,
          setRestaurantChat,
          setRestaurantChatroom
        );

        if (response.rider_id) {
          // Initialize chat channel for rider
          const riderChatRoom = `ChatRoom-G${response.guest_id}-R${response.rider_id}`;
          initializeChatChannel(riderChatRoom, setRiderChat, setRiderChatroom);
        }
      }
    }
  };

  const initializeOrderChannel = (orderRoom: string) => {
    const channel = pusher.subscribe(orderRoom);
    channel.bind("Order-Updated-Event", (data: any) => {
      const parsedData = JSON.parse(data.message);
      const status = parsedData.status;

      // console.log("parsedData", parsedData);
      /* 
        If no rider is found after 3 tries:
        parsedData = There is a system error. Please contact support
      */

      setOrder({ ...parsedData, order_status: status });
      setOrderStatus(status);

      if (status == "canceled" || status == "delivered") {
        pusher.unsubscribe(orderRoom);
      } else {
        if (status != "canceled") {
          const thisRider = {
            order_id: parsedData.id,
            rider_id: parsedData.rider_id,
            rider_name: parsedData.rider_name,
            rider_photo: parsedData.rider_photo,
            rider_vehicle_brand: parsedData.rider_vehicle_brand,
            rider_vehicle_model: parsedData.rider_vehicle_model,
            rider_rating: parsedData.rider_rating,
            rider_average_rating: parsedData.rider_average_rating,
            plate_number: parsedData.plate_number,
          };
          setRider(thisRider);
        }

        if (status == "otw") {
          if (parsedData.rider_id) {
            if (isAuthenticated()) {
              // Initialize chat channel for rider
              const riderChatRoom = `ChatRoom-C${parsedData.customer_id}-R${parsedData.rider_id}`;
              initializeChatChannel(
                riderChatRoom,
                setRiderChat,
                setRiderChatroom
              );
            } else {
              // Initialize chat channel for rider
              const riderChatRoom = `ChatRoom-G${parsedData.guest_id}-R${parsedData.rider_id}`;
              initializeChatChannel(
                riderChatRoom,
                setRiderChat,
                setRiderChatroom
              );
            }
          }
        }
      }
    });
    channel.bind("Order-Rider-Assigned-Event", (data: any) => {
      const parsedData = JSON.parse(data.message);
      console.log(data);
      console.log("Order assigned!", parsedData);

      /* 
        If no rider is found:
        parsedData = Sorry all our riders are busy right now
      */
    });
  };

  const initializeChatChannel = (
    chatRoom: string,
    setChat: any,
    setChatroom: any
  ) => {
    setChatroom(chatRoom);
    // console.log("setChatroom", chatRoom);

    const channelChat = pusher.subscribe(chatRoom);
    channelChat.bind("Message-Event", (data: any) => {
      const chatData = JSON.parse(data.message);
      // console.log("New chat!", chatData);
      setChat((current: any) => {
        if (current?.length) {
          return [...current, chatData];
        }
        return [chatData];
      });
    });
  };

  const handleCancelOrder = async () => {
    // console.log("Cancel order ...", id);

    const response = await cancelOrderById(id);
    // console.log("cancelOrderById response", response);

    if (!response.error) {
      const newOrderObj: TOrder = { ...order, order_status: "canceled" };
      setOrder(newOrderObj);
      setModalCancelShow(true);
    } else {
      alert(response.error);
    }
  };

  const handleCancelOrderGuest = async () => {
    // console.log("Cancel order guest ...", id);

    // Get guest session in local storage
    const guestSession = localStorage.getItem("guestSession");

    const response = await cancelOrderByIdGuest(id, guestSession);
    // console.log("cancelOrderByIdGuest response", response);

    if (!response.error) {
      const newOrderObj: TOrder = { ...order, order_status: "canceled" };
      setOrder(newOrderObj);
      setModalCancelShow(true);
    } else {
      alert(response.error);
    }
  };

  const handleRestaurantFeedback = () => {
    if (rider?.rider_rating) {
      // Navigate to restaurant feedback page when rider rating is done
      navigate("feedback");
    } else {
      // Show rider feedback modal if no rider feedback yet
      setModalShow(true);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <>
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
                    <img
                      src={statusIsOtwAlt}
                      alt=""
                      className={styles.altImg}
                    />
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
                onClick={handleRestaurantFeedback}
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

        <div className={styles.chatContainer}>
          <Chat
            orderId={id}
            restaurantChat={restaurantChat}
            setRestaurantChat={setRestaurantChat}
            riderChat={riderChat}
            setRiderChat={setRiderChat}
            orderStatus={orderStatus}
            restaurantChatroom={restaurantChatroom}
            riderChatroom={riderChatroom}
          />
        </div>
      </div>

      <Modal
        show={modalCancelShow}
        onHide={() => setModalCancelShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center p-4 ${styles.lottie}`}>
            <Lottie animationData={otpSuccess} loop={true} />
            <p className="mt-4">{constants.form.success.cancelOrder}</p>

            <Button
              onClick={() => setModalCancelShow(false)}
              className={`d-inline-block mt-2 ${styles.button}`}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderContent;
