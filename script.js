const API_KEY = "43357a3f32cb31e9db3df0f8b29cb3dd";

let forecastData = [];

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherDiv = document.getElementById("weather");
    const loading = document.getElementById("loading");
    const suggestion = document.getElementById("suggestion");

    if (!city) {
        alert("Enter a city name");
        return;
    }

    loading.innerText = "Loading...";
    weatherDiv.innerHTML = "";
    suggestion.innerHTML = "";

    try {
        // CURRENT WEATHER
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].main;

        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <div class="weather-stats">
                <p><span><i class="ph ph-thermometer"></i> Temperature</span> <span>${temp}°C</span></p>
                <p><span><i class="ph ph-drop"></i> Humidity</span> <span>${humidity}%</span></p>
                <p><span><i class="ph ph-cloud"></i> Condition</span> <span style="text-transform: capitalize;">${condition}</span></p>
            </div>
        `;

        // BACKGROUND CHANGE
        if (temp > 30) {
            document.body.style.background = "#7f1d1d"; // Solid red for hot
        } else if (temp < 15) {
            document.body.style.background = "#1e3a8a"; // Solid deep blue for cold
        } else {
            document.body.style.background = "#0f172a"; // Default solid slate
        }

        // WHAT TO WEAR (SMART)
        let advice = "";

        if (condition.toLowerCase().includes("rain")) {
            advice = "<i class='ph ph-umbrella'></i> Carry an umbrella & waterproof shoes";
        } 
        else if (temp >= 35) {
            advice = "<i class='ph ph-sun'></i> Light clothing, stay well hydrated";
        } 
        else if (temp >= 25) {
            advice = "<i class='ph ph-sunglasses'></i> Perfect weather, dress light";
        } 
        else if (temp >= 15) {
            advice = "<i class='ph ph-coat-hanger'></i> Light jacket or hoodie advised";
        } 
        else {
            advice = "<i class='ph ph-snowflake'></i> Heavy jacket required, it's freezing";
        }

        suggestion.innerHTML = `<strong>What to wear:</strong> ${advice}`;

        // FORECAST API
        const res2 = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const data2 = await res2.json();

        // HOF (NO LOOPS ❌)
        forecastData = data2.list
            .filter((_, index) => index % 8 === 0)
            .map(item => ({
                date: item.dt_txt.split(" ")[0],
                temp: item.main.temp
            }));

        displayForecast(forecastData);

        loading.innerText = "";

    } catch (error) {
        loading.innerText = "";
        weatherDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

// DISPLAY FORECAST
function displayForecast(data) {
    const forecastDiv = document.getElementById("forecast");

    let html = "<h3>Next 5 days</h3>";

    data.forEach(day => {
        html += `<p><span>${day.date}</span> <span>${day.temp}°C</span></p>`;
    });

    forecastDiv.innerHTML = html;
}

// FILTER (HOF)
function filterHot() {
    const filtered = forecastData.filter(day => day.temp > 25);
    displayForecast(filtered);
}

function filterCold() {
    const filtered = forecastData.filter(day => day.temp < 20);
    displayForecast(filtered);
}

// SORT (HOF)
function sortHigh() {
    const sorted = [...forecastData].sort((a, b) => b.temp - a.temp);
    displayForecast(sorted);
}

function sortLow() {
    const sorted = [...forecastData].sort((a, b) => a.temp - b.temp);
    displayForecast(sorted);
}