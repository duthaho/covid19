import React from "react";

function Slider({ cases, confirmed, dead }) {
  return (
    <div
      className="ss-row-clear"
      id="headslider"
      style={{ paddingTop: "69px" }}
    >
      <div
        className="camera_wrap camera_indigo_skin camera-header"
        id="camera_wrap_1"
      >
        <div
          data-thumb="images/preview/banner-1.jpg"
          data-src="images/preview/banner-1.jpg"
        >
          <div className="fadeFromBottom">
            <div className="camera-title-container">
              <h1 className="camera-big-title">VIỆT NAM</h1>
              <p className="camera-subtitle">Số ca nhiễm: {cases}</p>
              <p className="camera-subtitle">Bình phục: {confirmed}</p>
              <p className="camera-subtitle">Tử vong: {dead}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="camera-header-end"></div>
    </div>
  );
}

export default Slider;
