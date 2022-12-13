import React from "react";
import HistoryStatusCancelledContainer from "../../components/Account/HistoryStatus/Cancel/HistoryStatusCancelContainer";

type Props = {};

const HistoryStatus = (props: Props) => {
  return (
    <div className="page">
      <HistoryStatusCancelledContainer />
    </div>
  );
};

export default HistoryStatus;