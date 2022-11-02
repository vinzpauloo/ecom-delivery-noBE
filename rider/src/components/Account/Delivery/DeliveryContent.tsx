import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import "./DeliveryContent.scss";

import SearchIcon from "../../../assets/images/search.png";
import RiderIcon from "../../../assets/images/riderotw-icon.png";
import KitchenIcon from "../../../assets/images/kitchen-icon.png";
import OrderReceivedIcon from "../../../assets/images/order-received-icon.png";

interface ContainerProps {}

const DeliveryContent: React.FC<ContainerProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);

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
        <Table size="sm">
          <thead className="table-head">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Order Placed Time</th>
              <th>Customer Name</th>
              <th>Grand Total</th>
              <th>Status</th>
              <th>Mark as</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BLH-0001</td>
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
                  <button>Delivered</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>BLH-0002</td>
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
                  <button>Delivered</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>BLH-0003</td>
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
                  <button>Delivered</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>BLH-0004</td>
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
                  <button>Delivered</button>
                </div>
              </td>
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

export default DeliveryContent;
