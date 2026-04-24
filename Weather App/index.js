function getWeatherIcon(main) {
  const map = {
    Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
    Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Haze: '🌫️',
    Fog: '🌫️', Smoke: '🌫️', Dust: '🌪️', Tornado: '🌪️'
  };
  return map[main] || '🌡️';
}

async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const apiKey = 'c5e0fd13cf944507d9222a3684929120';
  const box = document.getElementById('resultBox');
  const err = document.getElementById('errorMsg');
  if (!city) return;
  err.innerHTML = '';
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    if (data.cod == 200) {
      document.getElementById('weatherIcon').innerText = getWeatherIcon(data.weather[0].main);
      document.getElementById('cityName').innerText = data.name;
      document.getElementById('weatherDesc').innerText = data.weather[0].description;
      document.getElementById('tempVal').innerHTML = Math.round(data.main.temp) + '<sup>°C</sup>';
      document.getElementById('feelsLike').innerText = Math.round(data.main.feels_like) + '°C';
      document.getElementById('humidity').innerText = data.main.humidity + '%';
      document.getElementById('wind').innerText = Math.round(data.wind.speed * 3.6) + ' km/h';
      box.classList.add('show');
    } else {
      box.classList.remove('show');
      err.innerHTML = '<p class="error">City not found. Please try again.</p>';
    }
  } catch (e) {
    box.classList.remove('show');
    err.innerHTML = '<p class="error">Something went wrong. Check your connection.</p>';
  }
}

document.getElementById('city').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') getWeather();
});