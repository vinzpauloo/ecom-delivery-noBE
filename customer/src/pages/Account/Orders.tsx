import React from "react";
import OrdersContainer from "../../components/Account/Orders/OrdersContainer";

type Props = {};

const Orders = (props: Props) => {
  return (
    <div className="page">
      <OrdersContainer />
    </div>
  );
};

export default Orders;
