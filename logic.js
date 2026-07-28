function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apikey = "924c80681d3e5cca3199e407b773cf5a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const weatherInfo = document.getElementById("weatherInfo");

    if (weatherInfo) {
        weatherInfo.innerHTML = "<p>Fetching weather...</p>";
    } else {
        console.error("Critical: Could not find an HTML element with id='weatherInfo'!");
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            weatherInfo.innerHTML = `
                <h2>${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data: ", error);
            weatherInfo.innerHTML = `<p style="color: red;">Failed to fetch weather data.(Reason: ${error.message}). Please check your city name.</p>`;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");

    cityInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            getWeather();
        }
    });
});
