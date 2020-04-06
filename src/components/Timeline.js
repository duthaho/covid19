import React from "react";

import Dot from "./Dot";
import Map from "./Map";
import Patient from "./Patient";

function Timeline() {
  return (
    <div className="ss-row" id="imgstyle-2">
      <div className="ss-left">
        <Dot date="22/03/2020" />

        <div className="time-dot"></div>
        <div className="arrow-side"></div>

        <Map lat={21.018218} lng={105.856926} />
      </div>

      <div className="ss-right">
        <div className="arrow-side"></div>

        <Patient address="Ha Noi" num={37} note="Di an bun o Ha Noi" />
      </div>
    </div>
  );
}

export default Timeline;
