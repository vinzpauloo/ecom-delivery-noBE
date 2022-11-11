import React, { useState } from "react";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import SearchIcon from "../../../assets/images/search.png";

import "./OrderHistoryContent.scss";

interface ContainerProps {}

function RequestModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          FOR DELIVERY
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table size="sm">
          <thead className="table-head">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Order Placed Time</th>
              <th>Ordered Delivered</th>
              <th>Rider Name</th>
              <th>Food Items</th>
              <th>Grand Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BLH-0001</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0002</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0003</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0004</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0005</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0006</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0007</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0008</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0009</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

function CompletedModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          COMPLETED ORDERS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table size="sm">
          <thead className="table-head">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Order Placed Time</th>
              <th>Ordered Delivered</th>
              <th>Rider Name</th>
              <th>Food Items</th>
              <th>Grand Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BLH-0001</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0002</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0003</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0004</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0005</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0006</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0007</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0008</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0009</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          CANCELLED ORDERS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table size="sm">
          <thead className="table-head">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Order Placed Time</th>
              <th>Ordered Delivered</th>
              <th>Rider Name</th>
              <th>Food Items</th>
              <th>Grand Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BLH-0001</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0002</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0003</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0004</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0005</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0006</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0007</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0008</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0009</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

const OrderHistoryContent: React.FC<ContainerProps> = ({}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);

  return (
    <div className="order-history-content">
      <div className="table-container">
        <div className="table-header">
          <div className="table-header-1">
            <h3>History</h3>
            <div className="search">
              <input type="text" placeholder="Search food and description" />
              <img src={SearchIcon} alt="" />
            </div>
          </div>

          <div className="table-header-buttons">
            <a onClick={() => setModalShow(true)}>For Delivery</a>
            <RequestModal show={modalShow} onHide={() => setModalShow(false)} />
            <a onClick={() => setModalShow1(true)}>Completed</a>
            <CompletedModal
              show={modalShow1}
              onHide={() => setModalShow1(false)}
            />
            <a onClick={() => setModalShow3(true)}>Cancelled</a>
            <CancelledModal
              show={modalShow3}
              onHide={() => setModalShow3(false)}
            />
          </div>
        </div>
        <Table size="sm">
          <thead className="table-head">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Order Placed Time</th>
              <th>Ordered Delivered</th>
              <th>Rider Name</th>
              <th>Food Items</th>
              <th>Grand Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BLH-0001</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0002</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0003</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
            <tr>
              <td>BLH-0004</td>
              <td>10/13/2022</td>
              <td>12:30PM</td>
              <td>1:30PM</td>
              <td>Aerox-Alexan</td>
              <td>Food Items</td>
              <td>456 php</td>
            </tr>
          </tbody>
        </Table>

        <div className="page-number">
          <a className="page-turn">&#60;</a>
          <a>1</a>
          <a>&nbsp;of</a>
          <a>&nbsp;5</a>
          <a className="page-turn">&#62;</a>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryContent;
