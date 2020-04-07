/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Banner from "./Banner";

const api = (country) =>
  `https://coronavirus-19-api.herokuapp.com/countries/${country}`;

function useLocalStorage(name, ttl, initial = null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(name);
      if (item) {
        const data = JSON.parse(item);
        const now = Date.now();
        if (data.expire > now) return data.value;
      }
      return initial;
    } catch {
      return initial;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(
        name,
        JSON.stringify({ value, expire: Date.now() + ttl })
      );
    } catch {}
  };

  return [storedValue, setValue];
}

function Slider() {
  const [dataVn, setDataVn] = useLocalStorage("cvn", 3600 * 1000);
  const [dataWorld, setDataWorld] = useLocalStorage("cworld", 3600 * 1000);

  useEffect(() => {
    if (!dataVn) {
      axios.get(api("Vietnam")).then((res) => setDataVn(res.data));
    }
    if (!dataWorld) {
      axios.get(api("World")).then((res) => setDataWorld(res.data));
    }
  }, []);

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
        <Banner {...(dataVn || {})} country="Việt Nam" />
        <Banner {...(dataWorld || {})} country="Thế giới" />
      </div>
      <div className="camera-header-end"></div>
    </div>
  );
}

export default Slider;
