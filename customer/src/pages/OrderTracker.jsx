import React from "react";
import "./OrderTracker.scss";

import orderReceived from "../assets/images/order-received.png";
import kitchenPrep from "../assets/images/kitchen-prep.png";
import rider from "../assets/images/rider-on-the-way.png";
import delivered from "../assets/images/delivered.png";
import { Link } from "react-router-dom";

const OrderTracker = () => {
  return (
    <div className="orderTracker">
      <div className="container mx-auto">
        <div className="title">
          <h1>Order Tracker</h1>
          <p>Please don't close the page.</p>
        </div>

        <div className="images">
          <div className="image">
            <img src={orderReceived} />
            <label>Order Received</label>
          </div>
          <div className="image">
            <img src={kitchenPrep} />
            <label>Kitchen - Preparing...</label>
          </div>
          <div className="image">
            <img src={rider} />
            <label>Rider on its way</label>
          </div>
          <div className="image">
            <img src={delivered} />
            <label>Delivered</label>
          </div>
        </div>

        <div className="ty">
          <Link to="/account" className="text-decoration-none">
            Thank you!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
