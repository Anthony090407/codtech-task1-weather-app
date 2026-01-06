function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    // First API to get latitude & longitude
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(response => response.json())
        .then(data => {
            if (!data.results) {
                result.innerHTML = "City not found";
                return;
            }

            const lat = data.results[0].latitude;
            const lon = data.results[0].longitude;

            // Second API for weather data
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        })
        .then(response => response.json())
        .then(weatherData => {
            const weather = weatherData.current_weather;

            result.innerHTML = `
                <h3>Temperature: ${weather.temperature}°C</h3>
                <p>Wind Speed: ${weather.windspeed} km/h</p>
            `;
        })
        .catch(error => {
            result.innerHTML = "Error fetching data";
        });
}
