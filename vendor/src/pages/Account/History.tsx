import React from "react";
import OrderHistoryContainer from "../../components/Account/History/OrderHistoryContainer";

type Props = {};

const History = (props: Props) => {
  return (
    <div className="page">
      <OrderHistoryContainer />
    </div>
  );
};

export default History;
