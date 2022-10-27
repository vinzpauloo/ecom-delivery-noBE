import React from "react";
import OrderHistoryContainer from "../../components/Account/OrderHistory/OrderHistoryContainer";

type Props = {};

const OrderHistory = (props: Props) => {
  return (
    <div className="page">
      <OrderHistoryContainer />
    </div>
  );
};

export default OrderHistory;
