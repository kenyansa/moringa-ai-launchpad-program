import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from 'axios';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHVibG9zZWt1cm8iLCJhIjoiY2xsem0wdzNoMDAxYzNqczZ3eWkwdnlyNyJ9._f-vlL_y1Zc8wAlWDqL06Q';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(36.82);
  const [lat, setLat] = useState(-1.29);
  const [zoom, setZoom] = useState(11.5);

  useEffect(() => {
    const DEVICE_ID = '641b3069572090002992a7a1';
    const TOKEN = '8VYUFBK2T4ZHK623';
    axios
      .get(
        `https://api.airqo.net/api/v2/devices/measurements/airqlouds/${DEVICE_ID}?token=${TOKEN}`
      )
      .then((res) => {
        if (res.data.success) {
          const sortedData = res.data.measurements.map((item) => ({
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
        }
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
