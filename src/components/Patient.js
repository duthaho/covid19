import React from "react";

function Patient({ name, address, note }) {
  return (
    <div className="container-border">
      <div className="gray-container">
        <div className="content-title">
          <span className="patient-name">{name}</span>
        </div>
        <p>{address}</p>
        <p>{note}</p>
      </div>
    </div>
  );
}

export default React.memo(Patient);
