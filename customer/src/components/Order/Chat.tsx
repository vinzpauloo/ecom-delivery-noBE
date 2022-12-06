import React, { useState } from "react";

import { Container, Form, Offcanvas } from "react-bootstrap";

import styles from "./Chat.module.scss";
import chatRider from "../../assets/images/chat-rider.png";
import chatRiderAlt from "../../assets/images/chat-rider-alt.png";
import chatVendor from "../../assets/images/chat-vendor.png";
import chatVendorAlt from "../../assets/images/chat-vendor-alt.png";

interface ContainerProps {}

const Chat: React.FC<ContainerProps> = ({}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const containerClick = (e: any) => {
    e.preventDefault();

    // Prevent child click events
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-between">
        <div className={styles.riderChat}>
          {/* Chat image */}
          <div className={styles.imgContainer}>
            <img src={chatRider} className="img-fluid" alt="" />
            <img src={chatRiderAlt} alt="" className={styles.altImg} />
          </div>

          {/* Preview */}
          <div className={styles.preview}>
            <p>Hi Rider!</p>
          </div>

          {/* Chat box */}
          {/* <div className={styles.chatBox}></div> */}
        </div>

        <div className={styles.vendorChat}>
          {/* Chat image */}
          <div className={styles.imgContainer} onClick={handleShow}>
            <img src={chatVendor} className="img-fluid" alt="" />
            <img src={chatVendorAlt} alt="" className={styles.altImg} />
          </div>

          {/* Preview */}
          <div className={styles.preview} onClick={handleShow}>
            <p>Hi Restaurant!</p>
          </div>

          {/* Chat box */}
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="bottom"
            className={styles.offcanvas}
          >
            <Offcanvas.Body className={styles.offcanvasBody}>
              <Container fluid="md" onClick={containerClick}>
                <div className={styles.chatBox}>
                  <ul>
                    <li>
                      <p className={styles.time}>12/06/2022 | 01:11pm</p>
                      <p className={styles.message}>Hi Restaurant!</p>
                    </li>

                    <li className={styles.reply}>
                      <p className={styles.time}>12/06/2022 | 01:15pm</p>
                      <p className={styles.message}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </li>

                    <li>
                      <p className={styles.time}>12/06/2022 | 01:17pm</p>
                      <p className={styles.message}>Okay, thank you!</p>
                    </li>

                    <li className={styles.reply}>
                      <p className={styles.time}>12/06/2022 | 01:15pm</p>
                      <p className={styles.message}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </p>
                    </li>

                    <li>
                      <p className={styles.time}>12/06/2022 | 01:17pm</p>
                      <p className={styles.message}>Thankssss!</p>
                    </li>

                    <li>
                      <p className={styles.time}>12/06/2022 | 01:17pm</p>
                      <p className={styles.message}>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here
                      </p>
                    </li>
                  </ul>

                  <Form.Group className={styles.formGroup}>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </div>
              </Container>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </div>
  );
};

export default Chat;
