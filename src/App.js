import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaHVibG9zZWt1cm8iLCJhIjoiY2xsem0wdzNoMDAxYzNqczZ3eWkwdnlyNyJ9._f-vlL_y1Zc8wAlWDqL06Q";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(36.82);
  const [lat, setLat] = useState(-1.29);
  const [zoom, setZoom] = useState(11.5);
  const measurementsRef = useRef([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const markerColors = {
      Green: "#4FCA57",
      Yellow: "#F4F432", // a less bright yellow
      Orange: "#F59636",
      Red: "#F53636",
      Purple: "#B836F5",
      Maroon: "Maroon",
    };
    const DEVICE_ID = "641b3069572090002992a7a1";
    const TOKEN = "8VYUFBK2T4ZHK623";
    axios
      .get(
        `https://api.airqo.net/api/v2/devices/measurements/airqlouds/${DEVICE_ID}?token=${TOKEN}`
      )
      .then((res) => {
        if (res.data.success) {
          const measurements = res.data.measurements.map((item) => ({
            device: item.device,
            time: item.time,
            pm2_5: item.pm2_5.value,
            siteDetails: {
              formatted_name: item.siteDetails.formatted_name,
              approximate_latitude: item.siteDetails.approximate_latitude,
              approximate_longitude: item.siteDetails.approximate_longitude,
            },
            aqi_color: item.aqi_color,
            aqi_category: item.aqi_category,
            aqi_color_name: item.aqi_color_name,
          }));
          measurementsRef.current = measurements;

          if (map.current) return;
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom,
          });

          // Add the navigation control to the map's bottom right corner
          map.current.addControl(
            new mapboxgl.NavigationControl({ showCompass: false }),
            "bottom-right"
          );

          measurementsRef.current.forEach((measurement) => {
            const markerColor =
              markerColors[measurement.aqi_color_name] || "blue"; // Default to blue if color is not found
            console.log(markerColor);
            const marker = new mapboxgl.Marker({
              color: markerColor, // Set the marker's color
            })
              .setLngLat([
                measurement.siteDetails.approximate_longitude,
                measurement.siteDetails.approximate_latitude,
              ])
              .addTo(map.current);

            const measurementTime = new Date(measurement.time);
            const currentTime = new Date();

            // Calculate the time difference in milliseconds
            const timeDifference = currentTime - measurementTime;

            // Calculate the time in minutes and hours
            const minutesAgo = Math.floor(timeDifference / (1000 * 60));
            const hoursAgo = Math.floor(minutesAgo / 60);

            // Determine whether to display minutes or hours
            const timeAgo =
              hoursAgo > 0
                ? `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`
                : `${minutesAgo} ${
                    minutesAgo === 1 ? "minute" : "minutes"
                  } ago`;

            let lastRefreshed = document.getElementById("last-refreshed");
            lastRefreshed.innerHTML = measurementTime.toLocaleTimeString(); // Display the last refreshed time in legend

            const popup = new mapboxgl.Popup().setHTML(
              // Set the popup's content
              `
              <h3>${measurement.siteDetails.formatted_name}</h3>
              <p class="last-refreshed">Last Refreshed : ${timeAgo}</p>
              <div style = "background-color : ${markerColor}; padding:12px; font-size:large; color: #333;">
                <span class="pm25-label">PM<sub>2.5</sub> : </span>
                <span class="pm25-value">${measurement.pm2_5.toFixed(
                  4
                )} </span> µg/m3
              </div>
              <p class="pm25-value">AQI Category: ${
                measurement.aqi_category
              }</p>
            `
            );

            marker.setPopup(popup);
            marker.getElement().addEventListener("click", () => {
              popup.addTo(map.current);
              if (selectedMarker) {
                selectedMarker.getPopup().remove();
              }
              setSelectedMarker(marker);
            });
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, [lng, lat, zoom, selectedMarker]);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />

      <div className="legend-container">
        <h4 className="legend-title">AQI Legend</h4>
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
        <div className="refresh-time">
          <span>
            Last Refreshed : <span id="last-refreshed"></span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

// Path: src/App.css
