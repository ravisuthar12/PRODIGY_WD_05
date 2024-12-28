const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');

function fetchWeather() {
    const location = document.getElementById('location-input').value.trim();
    if (!location) {
        errorMessage.textContent = 'Please enter a location.';
        weatherDisplay.innerHTML = '';
        return;
    }
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            errorMessage.textContent = '';
            const { name, main, weather } = data;
            weatherDisplay.innerHTML = `
                <h2>${name}</h2>
                <p>Temperature: ${main.temp}°C</p>
                <p>Feels Like: ${main.feels_like}°C</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
            `;
        })
        .catch(error => {
            errorMessage.textContent = error.message;
            weatherDisplay.innerHTML = '';
        });
}
