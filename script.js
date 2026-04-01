const API_KEY = "43357a3f32cb31e9db3df0f8b29cb3dd";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherDiv = document.getElementById("weather");
    const loading = document.getElementById("loading");

    if (!city) {
        alert("Enter a city name");
        return;
    }

    loading.innerText = "Loading...";
    weatherDiv.innerHTML = "";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        loading.innerText = "";

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].main;

        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡 Temperature: ${temp}°C</p>
            <p>💧 Humidity: ${humidity}%</p>
            <p>🌥 Condition: ${condition}</p>
        `;

        if (temp > 30) {
            document.body.style.background = "orange";
        } else if (temp < 15) {
            document.body.style.background = "blue";
        } else {
            document.body.style.background = "#222";
        }

    } catch (error) {
        loading.innerText = "";
        weatherDiv.innerHTML = `<p>${error.message}</p>`;
    }
}
