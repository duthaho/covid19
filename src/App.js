import React, { useState } from "react";

import Header from "./components/Header";
import Slider from "./components/Slider";
import Section from "./components/Section";

export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "dark") {
      document.body.classList.remove("blackbody");
    } else {
      document.body.classList.add("blackbody");
    }
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Header />
      <Slider cases={100} confirmed={10} dead={0} />
      <div id="ss-container" className="ss-container">
        <Section />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
