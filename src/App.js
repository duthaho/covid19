import React from "react";

import Header from "./components/Header";
import Slider from "./components/Slider";
import Timeline from "./components/Timeline";

function App() {
  return (
    <>
      <Header />
      <Slider cases={100} confirmed={10} dead={0} />
      <div id="ss-container" className="ss-container">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Timeline key={i} />
        ))}
      </div>
    </>
  );
}

export default App;
