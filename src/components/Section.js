import React, { useCallback } from "react";

import Timeline from "./Timeline";

import covid19 from "../covid19.json";
import country from "../country.json";

const countryLength = country.length;

function Section() {
  const renderTimeLine = useCallback(
    () =>
      covid19.map((c, index) => (
        <Timeline
          key={index}
          patient={c}
          country={country[index % countryLength]}
        />
      )),
    []
  );

  return renderTimeLine();
}

export default Section;
