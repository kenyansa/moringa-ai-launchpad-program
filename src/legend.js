import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";
import "./legend.css";

function Legend() {
  const [legendVisible, setLegendVisible] = useState(true);

  const toggleLegend = () => {
    setLegendVisible(!legendVisible);
  };

  return (
    <div
      className={`legend-container ${legendVisible ? "expanded" : "minimized"}`}
    >
      <div className="legend-header">
        <h4 className="legend-title">Air Quality Index Legend</h4>
        <button onClick={toggleLegend}>
          {legendVisible ? (
            <FontAwesomeIcon icon={faCompress} /> // Minimize icon
          ) : (
            <FontAwesomeIcon icon={faExpand} /> // Expand icon
          )}
        </button>
      </div>
      {legendVisible && (
        <div className="legend">
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#4FCA57" }}
            >
              0 - 12
            </span>
            <span>: Good</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#F4F432" }}
            >
              12.1 - 35.4
            </span>
            <span>: Moderate</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#F59636" }}
            >
              35.5 - 55.4
            </span>
            <span>: Unhealthy for Sensitive Groups</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#F53636" }}
            >
              55.5 - 150.4
            </span>
            <span>: Unhealthy</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#B836F5" }}
            >
              150.5 - 250.4
            </span>
            <span>: Very Unhealthy</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#8C2424" }}
            >
              250.5 - 500.4
            </span>
            <span>: Hazardous</span>
          </div>
        </div>
      )}
      <div className="refresh-time">
        <span>
          Last Refreshed : <span id="last-refreshed"></span>{" "}
        </span>
      </div>
    </div>
  );
}

export default Legend;
