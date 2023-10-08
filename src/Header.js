import React, { useState, useEffect } from "react";
import "./Header.css";
import nboImage from "./assets/nbo.png";

function Header() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="header">
      <img src={nboImage} alt="Logo" className="logo" />
      <h2 className="title">Nairobi Air Quality Index</h2>
      <h2 className="title" id="localetime">
        {formatDateTime(dateTime)}
      </h2>
      <a
        id="airqo"
        href="https://www.airqo.net/"
        target="_blank"
        rel="noreferrer"
      >
        <h5 className="sponsor">Powered by AirQo</h5>
      </a>
    </div>
  );
}

export default Header;
