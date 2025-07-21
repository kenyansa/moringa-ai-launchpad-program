# 🌍 AirQo - Air Quality Visualization Web App

A React-based web application that visualizes real-time air quality data using interactive Mapbox maps. It fetches air quality measurements from the AirQo API and displays site-specific PM2.5 data, AQI categories, and a color-coded legend for quick insights.

---

## 🚀 Features

- 📡 **Live Air Quality Data** – Fetches real-time PM2.5 readings via the AirQo API.
- 🗺️ **Interactive Map with Markers** – View AQI by location on a Mapbox map.
- 🎨 **Dynamic Legend** – Collapsible AQI legend with color-coded levels.
- 🕒 **Last Refreshed Indicator** – Displays the most recent data fetch time.
- 💬 **Informative Popups** – Marker popups show device name, PM2.5 values, AQI category, and how long ago the data was refreshed.
- 🧭 **Navigation Controls** – Built-in zoom and pan tools via Mapbox.

---

## 🛠️ Technologies Used

- **React** (v18.2.0)
- **Mapbox GL JS**
- **Axios**
- **FontAwesome**
- **CSS Modules**

---

## 📦 Installation Instructions
### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Mapbox Access Token
- AirQo API Token and Device ID

- Clone the repository
git clone https://github.com/your-username/airqo.git
cd airqo

Install dependencies

npm install
Set up environment variables
Create a .env file at the root level and add:

env
REACT_APP_ACCESS_TOKEN=your_mapbox_access_token
REACT_APP_DEVICE_ID=your_airqo_device_id
REACT_APP_TOKEN=your_airqo_api_token
Run the app locally
bash

npm start
The app will be available at http://localhost:3000. 

### Code Overview and Structure
src/
├── App.js          # Main component with map rendering logic
├── App.css
├── Header.js       # Top site header
├── Header.css
├── legend.js       # Air quality index legend and toggle
├── legend.css
├── assets/         # For icons, images, etc.
├── index.js        # React entry point
├── index.css
└── App.test.js     # Optional tests

### 🙌 Acknowledgments
- AirQo API
- Mapbox
- FontAwesome

### 📄 License
- This project is licensed under the MIT License.

### 🤝 Contributing
1. Contributions are welcome! To contribute:
2. Fork the repository
3. Create a new branch: git checkout -b feature/your-feature-name
4. Commit your changes: git commit -m "Add your message"
5. Push to the branch: git push origin feature/your-feature-name
6. Submit a pull request 🚀

## 🐛 Troubleshooting

| Issue                    | Solution                                                                 |
|--------------------------|--------------------------------------------------------------------------|
| `mapboxgl is not defined` | Ensure Mapbox is correctly imported: `import mapboxgl from "mapbox-gl"` |
| Empty map or no markers  | Confirm `.env` values are correct and AirQo API returns valid data       |
| CORS or network errors   | Check if API keys have proper access; use secure HTTPS endpoints         |
| Markers not clickable    | Confirm correct event listeners on each marker element                   |
