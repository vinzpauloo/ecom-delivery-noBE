import React, { useState } from "react";

import "./DeliveryContent.scss";

import SearchIcon from "../../../assets/images/search.png";

interface ContainerProps {}

const DeliveryContent: React.FC<ContainerProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="delivery-content-container">
      <div className="right">
        <form>
          <div className="right-header">
            <h3>Queuing</h3>
            <div className="search">
              <div className="d-flex position-relative">
                <input type="text" placeholder="Search food and description" />
                <img src={SearchIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="title">
            <ul className="title-list">
              <li>Order ID</li>
              <li>Date</li>
              <li>Time</li>
              <li>Customer Name</li>
              <li>Grand Total</li>
              <li>Status</li>
              <li>Mark as</li>
            </ul>

            <ul className="menu-list">
              <li>BLH-0001</li>
              <li>10/13/2022</li>
              <li>01:30PM</li>
              <li id="name">Brandon Boyd</li>
              <li id="price">456 PHP</li>
              <li>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </li>
              <li className="buttons">
                <button>Accept</button>
                <button>Delivered</button>
              </li>
            </ul>

            <ul className="menu-list">
              <li>BLH-0002</li>
              <li>10/13/2022</li>
              <li>02:30PM</li>
              <li>Corey Taylor</li>
              <li>456 PHP</li>
              <li>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </li>
              <li className="buttons">
                <button>Accept</button>
                <button>Delivered</button>
              </li>
            </ul>

            <ul className="menu-list">
              <li>BLH-0003</li>
              <li>10/13/2022</li>
              <li>03:30PM</li>
              <li>Led Zepellin</li>
              <li>456 PHP</li>
              <li>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </li>
              <li className="buttons">
                <button>Accept</button>
                <button>Delivered</button>
              </li>
            </ul>

            <ul className="menu-list">
              <li>BLH-0004</li>
              <li>10/13/2022</li>
              <li>04:30PM</li>
              <li>Ian Tayao</li>
              <li>456 PHP</li>
              <li>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </li>
              <li className="buttons">
                <button>Accept</button>
                <button>Delivered</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryContent;
