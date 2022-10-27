import React, { useState } from "react";

import "./OrderHistoryContent.scss";
import OrderImage from "../../../assets/images/sample-order.png";
import { Col, Modal, Row } from "react-bootstrap";

interface ContainerProps {}

const OrderHistoryContent: React.FC<ContainerProps> = ({}) => {
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {/* With image */}
          <div className="order-history-container">
            <div className="order-list">
              <div className="order">
                <div className="order-inner">
                  <div className="order-left">
                    <h6>Order ID : XRF123</h6>
                    <p>Order ID: XRF123</p>
                    <div className="order-left-details">
                      <div className="items">
                        <ul data-header="Delivery Address:">
                          <li>
                            4117 41st Floor., GT Tower Intl., De La Costa,
                            Makati CIty, Philippines
                          </li>
                        </ul>

                        <ul data-header="Items:">
                          <li>2x Burger</li>
                          <li>1x Spaghetti</li>
                          <li>3x Softdrinks</li>
                        </ul>
                      </div>
                      <ul data-header="Order Status:">
                        <li>Delivered</li>
                      </ul>
                    </div>
                  </div>
                  <div className="order-right">
                    <a onClick={() => setModalShow(false)}>Less Details</a>
                    <div className="grand-total">
                      <h6>Grand Total</h6>
                      <p>1,350 php</p>
                    </div>
                  </div>
                </div>

                <div className="order-images mx-5">
                  <Row>
                    <Col>
                      <div className="d-flex ">
                        <div className="this-image">
                          <img src={OrderImage} alt="" />
                        </div>
                        <div className="this-content">
                          <h6>Vegetable Tofu</h6>
                          <p>Chan’s Chinese Restaurant</p>

                          <ul>
                            <li>Quantity: 2</li>
                            <li>Price: 100 php each</li>
                            <li>Sub Total: 200 php</li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex ">
                        <div className="this-image">
                          <img src={OrderImage} alt="" />
                        </div>
                        <div className="this-content">
                          <h6>Vegetable Tofu</h6>
                          <p>Chan’s Chinese Restaurant</p>

                          <ul>
                            <li>Quantity: 2</li>
                            <li>Price: 100 php each</li>
                            <li>Sub Total: 200 php</li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="d-flex ">
                        <div className="this-image">
                          <img src={OrderImage} alt="" />
                        </div>
                        <div className="this-content">
                          <h6>Vegetable Tofu</h6>
                          <p>Chan’s Chinese Restaurant</p>

                          <ul>
                            <li>Quantity: 2</li>
                            <li>Price: 100 php each</li>
                            <li>Sub Total: 200 php</li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex ">
                        <div className="this-image">
                          <img src={OrderImage} alt="" />
                        </div>
                        <div className="this-content">
                          <h6>Vegetable Tofu</h6>
                          <p>Chan’s Chinese Restaurant</p>

                          <ul>
                            <li>Quantity: 2</li>
                            <li>Price: 100 php each</li>
                            <li>Sub Total: 200 php</li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="order-history-container">
      <h3>Order History</h3>
      <div className="order-list">
        <div className="order">
          <div className="order-inner">
            <div className="order-left">
              <h6>Order ID : XRF123</h6>
              <p>Order ID: XRF123</p>
              <div className="order-left-details">
                <div className="items">
                  <ul data-header="Delivery Address:">
                    <li>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati
                      CIty, Philippines
                    </li>
                  </ul>

                  <ul data-header="Items:">
                    <li>2x Burger</li>
                    <li>1x Spaghetti</li>
                    <li>3x Softdrinks</li>
                  </ul>
                </div>
                <ul data-header="Order Status:">
                  <li>Delivered</li>
                </ul>
              </div>
            </div>
            <div className="order-right">
              <a onClick={() => setModalShow(true)}>More Details</a>
              <div className="grand-total">
                <h6>Grand Total</h6>
                <p>1,350 php</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order">
          <div className="order-inner">
            <div className="order-left">
              <h6>Order ID : XRF123</h6>
              <p>Order ID: XRF123</p>
              <div className="order-left-details">
                <div className="items">
                  <ul data-header="Delivery Address:">
                    <li>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati
                      CIty, Philippines
                    </li>
                  </ul>

                  <ul data-header="Items:">
                    <li>2x Burger</li>
                    <li>1x Spaghetti</li>
                    <li>3x Softdrinks</li>
                  </ul>
                </div>
                <ul data-header="Order Status:">
                  <li>Delivered</li>
                </ul>
              </div>
            </div>
            <div className="order-right">
              <a onClick={() => setModalShow(true)}>More Details</a>
              <div className="grand-total">
                <h6>Grand Total</h6>
                <p>1,350 php</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order">
          <div className="order-inner">
            <div className="order-left">
              <h6>Order ID : XRF123</h6>
              <p>Order ID: XRF123</p>
              <div className="order-left-details">
                <div className="items">
                  <ul data-header="Delivery Address:">
                    <li>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati
                      CIty, Philippines
                    </li>
                  </ul>

                  <ul data-header="Items:">
                    <li>2x Burger</li>
                    <li>1x Spaghetti</li>
                    <li>3x Softdrinks</li>
                  </ul>
                </div>
                <ul data-header="Order Status:">
                  <li>Delivered</li>
                </ul>
              </div>
            </div>
            <div className="order-right">
              <a onClick={() => setModalShow(true)}>More Details</a>
              <div className="grand-total">
                <h6>Grand Total</h6>
                <p>1,350 php</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default OrderHistoryContent;
