import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRiderOTW } from "../../../hooks/useRiderOTW";
import constants from "../../../utils/constants.json";

import "./DeliveryContent.scss";

import SearchIcon from "../../../assets/images/search.png";
import RiderIcon from "../../../assets/images/riderotw-icon.png";
import KitchenIcon from "../../../assets/images/kitchen-icon.png";
import OrderReceivedIcon from "../../../assets/images/order-received-icon.png";
import RewardsIcon from "../../../assets/images/rewards-icon.png";
import Delivery from "../../../pages/Account/Delivery";

// Setup form schema & validation
interface IFormInputs {
  order_id: string;
  order_items: string;
  delivery_fee: string;
  grand_total: string;
  customer_name: string;
  contact_number: string;
  pickup_address: string;
  delivery_address: string;
  order_placed_time: string;
  order_status: string;
}

// const schema = yup
//   .object({
//     order_id: yup.string().required(),
//     order_items: yup.string().required(),
//     delivery_fee: yup.string().required(),
//     grand_total: yup.string().required(),
//     customer_name: yup.string().required(),
//     contact_number: yup.string().required(),
//     pickup_address: yup.string().required(),
//     delivery_address: yup.string().required(),
//     order_placed_time: yup.string().required(),
//     order_status: yup.string().required(),
//   })
//   .required();

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
  updated_at: string;
  rider_id: string;
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
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
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
};

// function DeliveryModal(props: any) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           FOR DELIVERY
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Table size="sm">
//           <thead className="table-head">
//             <tr>
//               <th>Order ID</th>
//               <th>Date</th>
//               <th>Order Placed Time</th>
//               <th>Ordered Delivered</th>
//               <th>Rider Name</th>
//               <th>Food Items</th>
//               <th>Grand Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>BLH-0001</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0002</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0003</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0004</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0005</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0006</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0007</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0008</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//             <tr>
//               <td>BLH-0009</td>
//               <td>10/13/2022</td>
//               <td>12:30PM</td>
//               <td>1:30PM</td>
//               <td>Aerox-Alexan</td>
//               <td>Food Items</td>
//               <td>456 php</td>
//             </tr>
//           </tbody>
//         </Table>
//       </Modal.Body>
//       <Modal.Footer>
//         <button onClick={props.onHide}>Close</button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

const DeliveryContent: React.FC<ContainerProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const navigateToHistory = () => {
    navigate("/account/order-history");
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);

  const {
    getForDelivery,
    getForDeliveryOTW,
    getOrderCompleted,
    getOrderCanceled,
  } = useRiderOTW();

  const { otw } = useParams();

  // const [forDelivery, setForDelivery] = useState<TForDelivery[] | null>(null);

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const [forOrderCompleted, setForOrderCompleted] = useState<
    ForCompletedItem[]
  >([]);

  const [forOrderCanceled, setForOrderCanceled] = useState<ForCanceledItem[]>(
    []
  );

  // const {
  //   reset,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IFormInputs>({
  //   resolver: yupResolver(schema),
  // });

  // Get for delivery request
  // const handleGetForDelivery = async () => {
  //   console.log("Requesting getUser ...");

  //   const response = await getForDelivery();
  //   console.log("handleGetForDelivery response", response);
  //   let defaultValues = {
  //     order_id: response.order_id,
  //     order_items: response.order_items,
  //     delivery_fee: response.delivery_fee,
  //     grand_total: response.grand_total,
  //     customer_name: response.customer_name,
  //     contact_number: response.contact_number,
  //     pickup_address: response.pickup_address,
  //     delivery_address: response.delivery_address,
  //     order_placed_time: response.order_placed_time,
  //     order_status: response.order_status,
  //   };

  //   reset(defaultValues);
  // };

  const loadOrderForDelivery = async (status: string) => {
    const params = { status: status };
    const response = await getForDeliveryOTW(params);
    console.log("getForDelivery", response);
    setForDelivery(response);
  };

  const loadOrderCompleted = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCompleted(params);
    console.log("getOrderCompleted", response);
    setForOrderCompleted(response);
  };

  const loadOrderCanceled = async (status: string) => {
    const params = { status: status };
    const response = await getOrderCanceled(params);
    console.log("getOrderCanceled", response);
    setForOrderCanceled(response);
  };

  useEffect(() => {
    // handleGetForDelivery();
    loadOrderForDelivery("otw");
    loadOrderCompleted("delivered");
    loadOrderCanceled("canceled");
  }, []);

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
          {forOrderCompleted.map((item, index) => {
            return (
              <Container
                className="order-delivery-container d-flex flex-column gap-2"
                fluid
                key={index}
              >
                <Row className="mx-md-3">
                  <Col xs={3} md={2} className="d-flex flex-column gap-1">
                    <div className="order-id">
                      <p>ORDER ID: {item.customer_id}</p>
                    </div>
                    <div className="order-items">
                      <ul aria-label="Order Items">
                        <li>Ramen Noodles(3x)</li>
                        <li>Milk Tea(2x)</li>
                        <li>1 Water Melon</li>
                        <li>1 Boba Soya</li>
                        <li>Pecking Duck (1x)</li>
                      </ul>
                    </div>
                    <div className="delivery-fee">
                      <p>
                        Delivery Fee <br />
                        <span>₱{item.rider_id}.00</span>
                      </p>
                    </div>
                    <div className="grand-total">
                      <p>
                        Grand Total <br />
                        <span>₱{item.rider_vehicle_model}.00</span>
                      </p>
                    </div>
                  </Col>
                  <Col xs={8} md={4}>
                    <div className="customer-info">
                      <li>
                        Customer Name: <span> {item.customer_name}</span>
                      </li>
                      <li>
                        Contact Number: <span> {item.customer_mobile}</span>
                      </li>
                      <li>
                        Pick up Address :<span> {item.restaurant_name}</span>
                      </li>
                      <li>
                        Delivery Address:
                        <span> {item.order_address}</span>
                      </li>
                      <li>
                        Order Placed Time: <span> {item.created_at}</span>
                      </li>
                      <li>
                        Order Status: <span> {item.order_status}</span>
                        <img src={OrderReceivedIcon} />
                      </li>

                      <div className="decline-accept">
                        <a>Decline</a>
                        <a>Accept</a>
                      </div>
                    </div>
                  </Col>
                </Row>
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
          <Container
            className="order-delivery-container d-flex flex-column gap-3"
            fluid
          >
            <Row className="mx-md-3">
              <Col xs={3} md={2} className="d-flex flex-column gap-1">
                <div className="order-id">
                  <p>ORDER ID: XRF123</p>
                </div>
                <div className="order-items">
                  <ul aria-label="Order Items">
                    <li>Ramen Noodles(3x)</li>
                    <li>Milk Tea(2x)</li>
                    <li>1 Water Melon</li>
                    <li>1 Boba Soya</li>
                    <li>Pecking Duck (1x)</li>
                  </ul>
                </div>
                <div className="delivery-fee">
                  <p>
                    Delivery Fee <br />
                    <span>85 php</span>
                  </p>
                </div>
                <div className="grand-total">
                  <p>
                    Grand Total <br />
                    <span>1,350 php</span>
                  </p>
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div className="customer-info">
                  <li>
                    Customer Name: <span>Brandon Boyd</span>
                  </li>
                  <li>
                    Contact Number: <span>0917 123 4567</span>
                  </li>
                  <li>
                    Pick up Address :
                    <span>
                      Chan's Chinese Restaurant, Panglao, Bohol, Philippines
                    </span>
                  </li>
                  <li>
                    Delivery Address:
                    <span>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati City
                    </span>
                  </li>
                  <li>
                    Order Placed Time: <span>01:30pm</span>
                  </li>
                  <li>
                    Order Status: <span>Order Received</span>
                    <img src={OrderReceivedIcon} />
                  </li>

                  <div className="decline-accept">
                    <a>Decline</a>
                    <a>Accept</a>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mx-md-3">
              <Col xs={3} md={2} className="d-flex flex-column gap-1">
                <div className="order-id">
                  <p>ORDER ID: XRF123</p>
                </div>
                <div className="order-items">
                  <ul aria-label="Order Items">
                    <li>Ramen Noodles(3x)</li>
                    <li>Milk Tea(2x)</li>
                    <li>1 Water Melon</li>
                    <li>1 Boba Soya</li>
                    <li>Pecking Duck (1x)</li>
                    <li>Pecking Duck (1x)</li>
                    <li>Pecking Duck (1x)</li>
                    <li>Pecking Duck (1x)</li>
                    <li>Pecking Duck (1x)</li>
                  </ul>
                </div>
                <div className="delivery-fee">
                  <p>
                    Delivery Fee <br />
                    <span>85 php</span>
                  </p>
                </div>
                <div className="grand-total">
                  <p>
                    Grand Total <br />
                    <span>1,350 php</span>
                  </p>
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div className="customer-info">
                  <li>
                    Customer Name: <span>Brandon Boyd</span>
                  </li>
                  <li>
                    Contact Number: <span>0917 123 4567</span>
                  </li>
                  <li>
                    Pick up Address :
                    <span>
                      Chan's Chinese Restaurant, Panglao, Bohol, Philippines
                    </span>
                  </li>
                  <li>
                    Delivery Address:
                    <span>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati City
                    </span>
                  </li>
                  <li>
                    Order Placed Time: <span>01:30pm</span>
                  </li>
                  <li>
                    Order Status: <span>Order Received</span>
                    <img src={OrderReceivedIcon} />
                  </li>

                  <div className="decline-accept">
                    <a>Decline</a>
                    <a>Accept</a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* <button onClick={props.onHide}>Close</button> */}
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="delivery-container">
      <div className="table-container-history">
        <div className="table-header">
          <div className="table-header-1">
            <h3>For Delivery</h3>
            <div className="search">
              <input type="text" placeholder="Search order ID" />
              <img src={SearchIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      {forDelivery.map((item, index) => {
        return (
          <Container
            className="order-delivery-container d-flex flex-column gap-3 d-md-none"
            fluid
            key={index}
          >
            <Row className="mx-md-3">
              <Col xs={3} md={2} className="d-flex flex-column gap-1">
                <div className="order-id">
                  <p>Order ID: {item.customer_id}</p>
                </div>
                <div className="order-items">
                  <ul aria-label="Order Items">
                    <li>Ramen Noodles(3x)</li>
                    <li>Milk Tea(2x)</li>
                    <li>1 Water Melon</li>
                    <li>1 Boba Soya</li>
                    <li>Pecking Duck (1x)</li>
                  </ul>
                </div>
                <div className="delivery-fee">
                  <p>
                    Delivery Fee <br />
                    <span>₱ {item.rider_id} .00</span>
                  </p>
                </div>
                <div className="grand-total">
                  <p>
                    Grand Total <br />
                    <span>₱ {item.restaurant_id} .00</span>
                  </p>
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div className="customer-info">
                  <li>
                    Customer Name: <span>{item.customer_name}</span>
                  </li>
                  <li>
                    Contact Number: <span>{item.customer_mobile} </span>
                  </li>
                  <li>
                    Pick up Address :<span> {item.restaurant_name}</span>
                  </li>
                  <li>
                    Delivery Address:
                    <span> {item.order_address}</span>
                  </li>
                  <li>
                    Order Placed Time: <span> {item.created_at} </span>
                  </li>
                  <li>
                    Order Status: <span> {item.order_status}</span>
                    <img src={OrderReceivedIcon} />
                  </li>

                  <div className="decline-accept">
                    <a>Decline</a>
                    <a>Accept</a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        );
      })}
      ;{/* Desktop */}
      {forDelivery.map((item, index) => {
        return (
          <Container
            className="order-delivery-container-desktop"
            fluid
            key={index}
          >
            <Row className="mx-md-3">
              <Col md={2} className="d-flex flex-column gap-1">
                <div className="order-id">
                  <p>ORDER ID: {item.customer_id}</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="customer-info">
                  <Row>
                    <Col md={8}>
                      <div className="d-flex gap-5">
                        <li>
                          Customer Name: <span> {item.customer_name}</span>
                        </li>
                        <li>
                          Contact Number: <span> {item.customer_mobile}</span>
                        </li>
                      </div>
                      <li>
                        Pick up Address :<span> {item.restaurant_name}</span>
                      </li>
                      <li>
                        Delivery Address:
                        <span> {item.order_address}</span>
                      </li>
                      <li>
                        Order Placed Time: <span> {item.created_at}</span>
                      </li>
                    </Col>
                    <Col>
                      <li className="d-flex flex-column justify-content-center align-items-center">
                        Order Status: <span> {item.order_status}</span>
                        <img src={OrderReceivedIcon} />
                      </li>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <div className="order-items overflow-auto">
                        <ul aria-label="Order Items">
                          <li>Ramen Noodles(3x)</li>
                          <li>Milk Tea(2x)</li>
                          <li>1 Water Melon</li>
                          <li>1 Boba Soya</li>
                          <li>Pecking Duck (1x)</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="delivery-fee">
                        <p>
                          Delivery Fee <br />
                          <span> ₱{item.rider_id}.00</span>
                        </p>
                        <div className="decline-accept">
                          <a>Decline</a>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="grand-total">
                        <p>
                          Grand Total <br />
                          <span> ₱{item.restaurant_id}.00</span>
                        </p>
                        <div className="decline-accept">
                          <a>Accept</a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        );
      })}
      <div className="bottom-buttons">
        <button onClick={navigateToHistory}>History</button>
        {/* <DeliveryModal show={modalShow} onHide={() => setModalShow(false)} /> */}
        <button onClick={() => setModalShow1(true)}>Completed</button>
        <CompletedModal show={modalShow1} onHide={() => setModalShow1(false)} />
        <button onClick={() => setModalShow2(true)}>Cancelled</button>
        <CancelledModal show={modalShow2} onHide={() => setModalShow2(false)} />
      </div>
      <div className="rewards-container">
        <div className="rewards-btn">
          {/* <a>Rewards</a>
          <img src={RewardsIcon} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default DeliveryContent;
