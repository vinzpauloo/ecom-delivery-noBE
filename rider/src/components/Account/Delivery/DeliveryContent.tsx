import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import "./DeliveryContent.scss";

import SearchIcon from "../../../assets/images/search.png";
import RiderIcon from "../../../assets/images/riderotw-icon.png";
import KitchenIcon from "../../../assets/images/kitchen-icon.png";
import OrderReceivedIcon from "../../../assets/images/order-received-icon.png";

interface ContainerProps {}

// function DeliveryModal(props) {
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

// function CompletedModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           COMPLETED ORDERS
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

// function CancelledModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           CANCELLED ORDERS
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

const DeliveryContent: React.FC<ContainerProps> = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);

  return (
    <div className="delivery-history-container">
      <div className="table-container-history">
        <div className="table-header">
          <div className="table-header-1">
            <h3>For Delivery</h3>
            <div className="search">
              <input type="text" placeholder="Search food and description" />
              <img src={SearchIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="test-table">
          <Table size="xs" responsive>
            <thead className="table-head">
              <tr className="table-test">
                <th className="test1">Order ID</th>
                <th>Date</th>
                <th>Order Placed Time</th>
                <th>Customer Name</th>
                <th>Grand Total</th>
                <th>Status</th>
                <th>Mark as</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <th className="test2">BLH-0001</th>
                <td>10/13/2022</td>
                <td>1:30PM</td>
                <td>Brandon Boyd</td>
                <td>456 php</td>
                <td>
                  <img src={RiderIcon} className="status-icon" />
                </td>
                <td>
                  <div className="mark-buttons">
                    <button>Accept</button>
                    <button>Cancel</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="test2">BLH-0002</td>
                <td>10/13/2022</td>
                <td>2:30PM</td>
                <td>Corey Taylor</td>
                <td>456 php</td>
                <td>
                  <img src={KitchenIcon} className="status-icon" />
                </td>
                <td>
                  <div className="mark-buttons">
                    <button>Accept</button>
                    <button>Cancel</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="test2">BLH-0003</td>
                <td>10/13/2022</td>
                <td>3:30PM</td>
                <td>Led Zeppelin</td>
                <td>456 php</td>
                <td>
                  <img src={OrderReceivedIcon} className="status-icon" />
                </td>
                <td>
                  <div className="mark-buttons">
                    <button>Accept</button>
                    <button>Cancel</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="test2">BLH-0004</td>
                <td>10/13/2022</td>
                <td>4:30PM</td>
                <td>Ian Tayao</td>
                <td>456 php</td>
                <td>
                  <img src={OrderReceivedIcon} className="status-icon" />
                </td>
                <td>
                  <div className="mark-buttons">
                    <button>Accept</button>
                    <button>Cancel</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="bottom-buttons">
          <button onClick={() => setModalShow(true)}>For delivery</button>
          {/* <DeliveryModal show={modalShow} onHide={() => setModalShow(false)} /> */}
          <button onClick={() => setModalShow1(true)}>Completed</button>
          {/* <CompletedModal
            show={modalShow1}
            onHide={() => setModalShow1(false)}
          /> */}
          <button onClick={() => setModalShow2(true)}>Cancelled</button>
          {/* <CancelledModal
            show={modalShow2}
            onHide={() => setModalShow2(false)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DeliveryContent;
