import React from "react";

function Country({ country, cases, recovered, deaths }) {
  return (
    <div className="container-border">
      <div className="gray-container">
        <h3 className="content-title">
          <span className="patient-name">{country}</span>
        </h3>
        <span className="button orange">Số ca nhiễm: {cases}</span>{" "}
        <span className="button green">Bình phục: {recovered}</span>{" "}
        <span className="button red">Tử vong: {deaths}</span>
      </div>
    </div>
  );
}

export default React.memo(Country);
