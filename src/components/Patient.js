import React from "react";

function Patient({ num, address, note }) {
  return (
    <div className="container-border">
      <div className="gray-container">
        <h3 className="content-title">Bệnh nhân: {num}</h3>
        <p>Địa điểm: {address}</p>
        <p>Ghi chú: {note}</p>
      </div>
    </div>
  );
}

export default Patient;
