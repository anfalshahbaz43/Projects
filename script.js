const apiKey = '60fbfe52e2dfdb864a62433d318aaf87'; // Replace with your OpenWeatherMap API key

const weatherCard = document.getElementById('weatherCard');
const cityNameEl = document.getElementById('cityName');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const weatherIconEl = document.querySelector('.weather-icon i');

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();

        cityNameEl.textContent = data.name;
        temperatureEl.textContent = `${data.main.temp} °C`;
        descriptionEl.textContent = data.weather[0].description;
        humidityEl.textContent = `💧 ${data.main.humidity}%`;
        windEl.textContent = `🌬️ ${data.wind.speed} m/s`;

        // Set weather icon based on main weather
        const weatherMain = data.weather[0].main.toLowerCase();
        if(weatherMain.includes('cloud')) weatherIconEl.className = 'fas fa-cloud';
        else if(weatherMain.includes('rain')) weatherIconEl.className = 'fas fa-cloud-showers-heavy';
        else if(weatherMain.includes('sun') || weatherMain.includes('clear')) weatherIconEl.className = 'fas fa-sun';
        else if(weatherMain.includes('snow')) weatherIconEl.className = 'fas fa-snowflake';
        else weatherIconEl.className = 'fas fa-smog';

    } catch (error) {
        weatherCard.innerHTML = `<p>${error.message}</p>`;
    }
}
