import React from "react";

function Patient({ name, address, note }) {
  return (
    <div className="container-border">
      <div className="gray-container">
        <span className="content-title">{name}</span>
        <p>Địa điểm: {address}</p>
        <p>Ghi chú: {note}</p>
      </div>
    </div>
  );
}

export default React.memo(Patient);
