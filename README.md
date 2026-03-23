Smart City Weather Dashboard

Project Description:
The Smart City Weather Dashboard is a web application that gives users access to real-time weather information and smart suggestions like what to wear or carry based on weather conditions.

Purpose:
The goal of this project is to create an interactive and user-friendly weather application using a public API. It will help users quickly understand weather conditions and help in making daily decisions and be informative.

API used:
https://openweathermap.org/api

Features:
	Core Features
		- Search weather by city
		- Current weather details (temperature, humidity, etc.)
		- 5-day forecast
		- Dynamic weather icons
	
  Smart Features
		- "What to Wear" suggestions based on weather conditions
		- Background color changes based on temperature

  Future Enhancements
		- Filtering weather data
		- Sorting cities based on temperature
		- Dark mode and Light mode

Technologies Used:
- HTML
- CSS
- JavaScript (Fetch API)

How the Project Works

1. The user enters a city name in the search bar or allows location access.
2. The application sends a request to the OpenWeatherMap API using the Fetch API.
3. The API returns real-time weather data including temperature, humidity, and weather conditions.
4. The data is processed and displayed dynamically on the webpage.
5. Based on the weather conditions:
- The app suggests what to wear or carry (e.g., umbrella, jacket).
- The background color and icons update accordingly.
6. A 5-day forecast is also displayed for better planning.

Setup Instructions
Clone the repository:
```bash
git clone https://github.com/your-username/smart-weather-dashboard.git

