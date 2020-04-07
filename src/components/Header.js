import React, { useContext } from "react";

import { ThemeContext } from "../App";

function Header() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <div className="ss-nav">
      <div id="header-wrapper">
        <div className="logo" onClick={toggleTheme}></div>
        <div className="wrapper">
          <ul className="nav" id="ss-nav">
            <li>
              <a href="#headslider">Trang chủ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
