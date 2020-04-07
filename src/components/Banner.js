import React from "react";

function Banner({ country, cases, recovered, deaths }) {
  return (
    <div
      data-thumb="images/preview/banner.jpg"
      data-src="images/preview/banner.jpg"
    >
      <div className="fadeFromBottom">
        <div className="camera-title-container">
          <h1 className="camera-big-title">{country}</h1>
          <p className="camera-subtitle">Số ca nhiễm: {cases || 0}</p>
          <p className="camera-subtitle">Bình phục: {recovered || 0}</p>
          <p className="camera-subtitle">Tử vong: {deaths || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Banner);
