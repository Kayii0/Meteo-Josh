# 🌤️ Weather App

A real-time weather application with a Python (FastAPI) backend and a TypeScript (Vite) frontend, powered by the free [Open-Meteo](https://open-meteo.com/) API.

## Features

- 🔍 Search current weather by city name
- 📍 Automatic weather for your current location (browser geolocation)
- 📅 7-day forecast (max/min temperature per day)
- 💨 Wind speed, humidity, and UV index
- 🌗 Day/night indicator
- 🎨 Colorful, animated gradient UI with custom SVG icons
- ⚠️ Graceful error handling (city not found, weather service unavailable)

## Tech Stack

**Backend**
- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/) (ASGI server)
- [Requests](https://requests.readthedocs.io/)

**Frontend**
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)

**API**
- [Open-Meteo](https://open-meteo.com/) — free weather & geocoding API, no key required

## Project Structure

```
Weather/
├── Backend/
│   └── main.py          # FastAPI app: geocoding + weather routes
└── Frontend/
    └── weather-frontend/
        ├── index.html
        └── src/
            ├── main.ts   # App logic (fetch, DOM, geolocation)
            └── style.css # Styling
```

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js (with npm)

### Backend setup

```bash
cd Backend
pip install fastapi uvicorn requests
python3 -m uvicorn main:app --reload
```

The API will be running at `http://127.0.0.1:8000`. Interactive docs are available at `http://127.0.0.1:8000/docs`.

### Frontend setup

```bash
cd Frontend/weather-frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (or another port if that one is busy — check your terminal output and update the backend's CORS settings accordingly).

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/weather/{city}` | Get current weather + 7-day forecast for a city name |
| `GET` | `/weather/coords?lat={lat}&lon={lon}` | Get current weather + 7-day forecast for coordinates |

## Possible Future Improvements

- [ ] Search history (recently searched cities)
- [ ] Configurable units (°C/°F, km/h/mph)
- [ ] Deploy backend and frontend online

## License

This project is open source and available under the [MIT License](LICENSE).