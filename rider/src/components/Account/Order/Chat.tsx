import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Form, Offcanvas } from "react-bootstrap";
import { useAuthUser } from "react-auth-kit";
import { useChat } from "../../../hooks/useChat";
import { getDate, getTime } from "../../../utils/formatDate";

import styles from "./Chat.module.scss";
import chatRider from "../../../assets/images/chat-rider.png";
import chatRiderAlt from "../../../assets/images/chat-rider-alt.png";

interface ContainerProps {
  orderId?: string;

  riderChat?: TChat[];
  setRiderChat?: any;
}

type TChat = {
  created_at?: string;
  from_user_type?: string;
  message?: string;
};

const chatItem = () => {};

const Chat: React.FC<ContainerProps> = ({
  orderId,

  riderChat,
  setRiderChat,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [initialLoadCounter, setInitialLoadCounter] = useState(0);

  const [hasNewChatRider, setHasNewChatRider] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [chatBoxClass, setChatBoxClass] = useState("left");
  const { getMessagesRider, createMessage } = useChat();
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
    if (direction === "left") setHasNewChatRider(false);
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
        to_user_type: "Customer",
        message,
      };
      console.log("submitting ...", data);

      setIsSending(true);
      const response = await createMessage(orderId, data);
      console.log(response);

      setIsSending(false);
      setMessage("");
    }
  };

  const loadMessagesRider = async () => {
    // Get user messages
    const response = await getMessagesRider(orderId);
    console.log("getMessagesRider response", response);
    setRiderChat(response.data);
  };

  useEffect(() => {
    loadMessagesRider();

    // console.log(auth());

    // Set current user
    const userFullname = `${auth()?.first_name} ${auth()?.last_name}`;
    setUser(userFullname);
  }, []);

  useEffect(() => {
    // Mark initial load as done
    setInitialLoadCounter(initialLoadCounter + 1);

    // Update blinking chat icons
    if (!show && initialLoadCounter > 1) {
      console.log("setHasNewChatRider === true");
      setHasNewChatRider(true);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [riderChat]);

  return (
    <div className={styles.container}>
      <div className={`d-flex justify-content-between`}>
        <div className={styles.riderChat}>
          {/* Chat image */}
          <div
            className={styles.imgContainer}
            onClick={() => handleShow("left")}
          >
            <img src={chatRider} className="img-fluid" alt="" />
            {hasNewChatRider && (
              <img src={chatRiderAlt} alt="" className={styles.altImg} />
            )}
          </div>

          {/* Preview */}
          <div className={styles.preview} onClick={() => handleShow("left")}>
            <p>{riderChat && riderChat[riderChat.length - 1]?.message}</p>
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
                {chatBoxClass === "left" &&
                  riderChat?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          item.from_user_type === "Rider" && styles.reply
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
