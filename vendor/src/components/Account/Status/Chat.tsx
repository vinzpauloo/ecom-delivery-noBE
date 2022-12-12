import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Form, Offcanvas } from "react-bootstrap";
import { useAuthUser } from "react-auth-kit";
import { useChat } from "../../../hooks/useChat";
import { getDate, getTime } from "../../../utils/formatDate";

import styles from "./Chat.module.scss";
import chatVendor from "../../../assets/images/chat-vendor.png";
import chatVendorAlt from "../../../assets/images/chat-vendor-alt.png";

interface ContainerProps {
  orderId?: string;
  restaurantChat?: TChat[];
  setRestaurantChat?: any;
  isGuest?: boolean;
  restaurantChatroom?: string;
}

type TChat = {
  created_at?: string;
  from_user_type?: string;
  message?: string;
};

const chatItem = () => {};

const Chat: React.FC<ContainerProps> = ({
  orderId,
  restaurantChat,
  setRestaurantChat,
  isGuest,
  restaurantChatroom,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [initialLoadCounter, setInitialLoadCounter] = useState(0);
  const [hasNewChatRestaurant, setHasNewChatRestaurant] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [chatBoxClass, setChatBoxClass] = useState("left");

  const {
    getMessagesRestaurant,
    createMessage,
  } = useChat();
  const auth = useAuthUser();

  const containerClick = (e: any) => {
    e.preventDefault();

    // Prevent child click events
    if (e.target === e.currentTarget) {
      // Hide chat box when clicked outside
      setShow(false);
    } else if (e.target.type === "submit") {
      // Trigger form submit programatically
      handleSubmit();
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = (direction: string) => {
    setChatBoxClass(direction);
    setShow(true);

    // Update blinking chat icons
    if (direction === "right") setHasNewChatRestaurant(false);
  };

  const handleOnShow = () => {
    // 👇️ scroll to bottom every time messages change
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  };

  const handleOnChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (message.replace(/\s+/g, "")) {
      const data = {
        order_id: orderId,
        to_user_type: isGuest ? "Guest" : "Customer",
        message,
      };
      console.log("submitting ...", data);

      setIsSending(true);
      const response = await createMessage(data);
      console.log(response);

      setIsSending(false);
      setMessage("");
    }
  };

  const loadMessagesMerchant = async () => {
    // console.log(isGuest);
    const data = {
      order_id: orderId,
      channel_name: restaurantChatroom,
    };
    // Get authenticated user messages
    const response = await getMessagesRestaurant(orderId);
    console.log("getMessagesRestaurant response", response);
    setRestaurantChat(response.data);
  };

  useEffect(() => {
    loadMessagesMerchant();

    // Set current user
    const userFullname = `${auth()?.first_name} ${auth()?.last_name}`;
    setUser(userFullname);
  }, []);

  useEffect(() => {
    // Mark initial load as done
    setInitialLoadCounter(initialLoadCounter + 1);

    // Update blinking chat icons
    if (!show && initialLoadCounter > 1 && restaurantChat?.length) {
      console.log("setHasNewChatRestaurant === true");
      setHasNewChatRestaurant(true);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [restaurantChat]);

  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-between">
        <div className={styles.vendorChat}>
          {/* Chat image */}
          <div
            className={styles.imgContainer}
            onClick={() => handleShow("right")}
          >
            <img src={chatVendor} className="img-fluid" alt="" />
            {hasNewChatRestaurant && (
              <>
                <img src={chatVendorAlt} alt="" className={styles.altImg} />
                <span className={styles.dot}></span>
              </>
            )}
          </div>

          {/* Preview */}
          <div className={styles.preview} onClick={() => handleShow("right")}>
            <p>
              {restaurantChat &&
                restaurantChat[restaurantChat.length - 1]?.message}
            </p>
          </div>
        </div>
      </div>

      {/* Chat box offcanvas */}
      <Offcanvas
        show={show}
        onShow={handleOnShow}
        onHide={handleClose}
        placement="bottom"
        className={styles.offcanvas}
      >
        <Offcanvas.Body className={styles.offcanvasBody}>
          <Container fluid="md" onClick={containerClick}>
            <div className={`${styles.chatBox} ${styles[chatBoxClass]}`}>
              <ul>
                {chatBoxClass === "right" &&
                  restaurantChat?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          item.from_user_type === "Merchant" && styles.reply
                        }`}
                      >
                        <p className={styles.time}>
                          {getDate(item.created_at || "")} |&nbsp;
                          {getTime(item.created_at || "")}
                        </p>
                        <p className={styles.message}>{item.message}</p>
                      </li>
                    );
                  })}
              </ul>

              <Form className={styles.form} onSubmit={handleSubmit}>
                <Form.Group className={styles.formGroup}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={message}
                    onChange={(e) => handleOnChange(e)}
                    required
                    disabled={isSending}
                  />
                </Form.Group>

                <div className="text-center mt-2">
                  <Button variant="primary" type="submit" disabled={isSending}>
                    {!isSending ? "Send Messages" : "Sending ..."}
                  </Button>
                </div>
              </Form>

              {/* Reference to scroll down automatically when a new message is received */}
              <div ref={messagesEndRef}></div>
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Chat;
