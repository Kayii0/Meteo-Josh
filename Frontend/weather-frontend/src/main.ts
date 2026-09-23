import './style.css'

const cityInput = document.querySelector<HTMLInputElement>('#cityInput')!
const fetchWeatherBtn = document.querySelector<HTMLButtonElement>('#fetchWeatherBtn')!
const resultsDiv = document.querySelector<HTMLDivElement>('#results')!

fetchWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value

  const response = await fetch(`http://127.0.0.1:8000/weather/${city}`)
  const data = await response.json()

  if (!response.ok) {
    resultsDiv.innerHTML = `<p>Error: ${data.detail}</p>`
    return
  }

// le parametre current obligatoire pr accéder aux données sinon ça ecrit undefined, dans l'url dans le backend on retrouve ce param current !!
  resultsDiv.innerHTML = `
    <h2>Weather in ${data.location}</h2>
    <p>Temperature: ${data.current.temperature_2m}°C</p>
    <p>Humidity: ${data.current.relative_humidity_2m}%</p>
    <p>Wind Speed: ${data.current.wind_speed_10m} m/s</p>
    <p>UV Index: ${data.current.uv_index}</p>
  `
})