import React from "react";

function Dot({ date }) {
  return (
    <div className="time-dot-date">
      <div className="arrow-date-border"></div>
      <div className="arrow-date"></div>
      <div className="container-border">
        <div className="gray-container">{date}</div>
      </div>
    </div>
  );
}

export default React.memo(Dot);
