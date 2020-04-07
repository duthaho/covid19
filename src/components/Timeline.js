import React from "react";

import Dot from "./Dot";
import Country from "./Country";
import Patient from "./Patient";

function Timeline({ patient, country, invert }) {
  return (
    <div className="ss-row">
      <div className="ss-left">
        {patient.showDate && <Dot date={patient.verifyDate} />}

        <div className="time-dot"></div>
        <div className="arrow-side"></div>

        {invert ? <Country {...country} /> : <Patient {...patient} />}
      </div>

      <div className="ss-right">
        <div className="arrow-side"></div>

        {invert ? <Patient {...patient} /> : <Country {...country} />}
      </div>
    </div>
  );
}

export default Timeline;
