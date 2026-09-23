import './style.css'

const cityInput = document.querySelector<HTMLInputElement>('#cityInput')!
const fetchWeatherBtn = document.querySelector<HTMLButtonElement>('#fetchWeatherBtn')!
const resultsDiv = document.querySelector<HTMLDivElement>('#results')!

// incon
const windIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 14h15a3 3 0 1 1-3 3"/></svg>`
const dropletIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c4 5 7 8.5 7 12.5a7 7 0 1 1-14 0C5 10.5 8 7 12 2Z"/></svg>`
const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`



// le parametre current obligatoire pr accéder aux données sinon ça ecrit undefined, dans l'url dans le backend on retrouve ce param current !!
fetchWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value

  fetchWeatherBtn.disabled = true
  fetchWeatherBtn.textContent = 'Recherche...'
  resultsDiv.innerHTML = ''

  try {
    const response = await fetch(`http://127.0.0.1:8000/weather/${city}`)
    const data = await response.json()

    if (!response.ok) {
      resultsDiv.innerHTML = `<p class="error-message">${data.detail}</p>`
      return
    }

    const jours = data.daily.time.map((date: string, index: number) => {
  const jourNom = index === 0 ? 'Auj.' : new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })
  
  return `<div class="day">
    <span>${jourNom}</span>
    <span class="day-temps">${data.daily.temperature_2m_max[index]}° / ${data.daily.temperature_2m_min[index]}°</span>
  </div>`
})

    const html = jours.join('')

    resultsDiv.innerHTML = `
      <div class="weather-card">
        <h2>${data.location}</h2>
        <div class="weather-temp">${data.current.temperature_2m}°C</div>
        <div class="weather-details">
          <p>${windIcon} ${data.current.wind_speed_10m} km/h</p>
          <p>${dropletIcon} ${data.current.relative_humidity_2m}%</p>
          <p>${sunIcon} UV ${data.current.uv_index}</p>
        </div>
        <div class="forecast">
          ${html}
        </div>
      </div>
    `
  } finally {
    fetchWeatherBtn.disabled = false
    fetchWeatherBtn.textContent = 'Chercher'
  }
})

navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords

    try {
      const response = await fetch(`http://127.0.0.1:8000/weather/coords?lat=${latitude}&lon=${longitude}`)
      const data = await response.json()

      if (!response.ok) {
        resultsDiv.innerHTML = `<p class="error-message">${data.detail}</p>`
        return
      }

      const jours = data.daily.time.map((date: string, index: number) => {
  const jourNom = index === 0 ? 'Auj.' : new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })
  
  return `<div class="day">
    <span>${jourNom}</span>
    <span class="day-temps">${data.daily.temperature_2m_max[index]}° / ${data.daily.temperature_2m_min[index]}°</span>
  </div>`
})

    const html = jours.join('')

      resultsDiv.innerHTML = `
        <div class="weather-card">
          <h2>Ma position</h2>
          <div class="weather-temp">${data.current.temperature_2m}°C</div>
          <div class="weather-details">
            <p>${windIcon} ${data.current.wind_speed_10m} km/h</p>
            <p>${dropletIcon} ${data.current.relative_humidity_2m}%</p>
            <p>${sunIcon} UV ${data.current.uv_index}</p>
          </div>
          <div class="forecast">
            ${html}
          </div>
        </div>
      `
    } catch (error) {
      resultsDiv.innerHTML = `<p class="error-message">Erreur lors de la récupération des données météo.</p>`
    }
  }
)