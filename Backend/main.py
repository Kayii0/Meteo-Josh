from fastapi import FastAPI, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

def get_coordinates(loc):
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={loc}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Weather service unavailable.")


def get_weather(lat, lon):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code,uv_index&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7"
    try:    
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Weather service unavailable.")

@app.get("/weather/coords")
def weather_coords(lat: float, lon: float):
    weather_data = get_weather(lat, lon)

    return {
        "latitude": lat,
        "longitude": lon,
        "current": weather_data.get("current", {}),
        "daily": weather_data.get("daily", {}),
    }

@app.get("/weather/{loc}")
def weather(loc: str):
    data = get_coordinates(loc)

    if "results" not in data or not data["results"]:
        raise HTTPException(status_code=404, detail="Location not found.")

    location_data = data["results"][0]
    weather_data = get_weather(
        location_data["latitude"],
        location_data["longitude"],
    )

    return {
        "location": location_data.get("name", loc),
        "latitude": location_data["latitude"],
        "longitude": location_data["longitude"],
        "current": weather_data.get("current", {}),
        "daily": weather_data.get("daily", {}),
    }

