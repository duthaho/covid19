import React from "react";

import Dot from "./Dot";
import Map from "./Map";
import Patient from "./Patient";

function Timeline({ verifyDate, address, lat, lng, name, note }) {
  return (
    <div className="ss-row" id="imgstyle-2">
      <div className="ss-left">
        <Dot date={verifyDate} />

        <div className="time-dot"></div>
        <div className="arrow-side"></div>

        <Map lat={lat} lng={lng} />
      </div>

      <div className="ss-right">
        <div className="arrow-side"></div>

        <Patient address={address} name={name} note={note} />
      </div>
    </div>
  );
}

export default Timeline;
