// Container element for weather displaying
const weatherSection = document.getElementById('weather-section');

// List of cities with their coordinates
const cities = [
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Singapore", lat: 1.28967, lon: 103.85007 },
    { name: "Oslo", lat: 59.91273, lon: 10.74609 },
    { name: "Berlin", lat: 52.52437, lon: 13.41053 },
    { name: "New York", lat: 40.71427, lon: -74.00597 },
    { name: "Los Angeles", lat: 34.05223, lon: -118.24368 }
];

// Indicator for loading state - prevent multiple fetches
let isLoading = false;

// Fetch posts from open-meteo API
async function fetchWeather() {
    if (isLoading) return;
    isLoading = true;

    for (const city of cities) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const weatherData = await response.json();
                displayWeather(city.name, weatherData.current_weather);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    isLoading = false;
}


// Function to display weather data on the website
function displayWeather(cityName, weatherData) {
    const entryId = `weather-${cityName}`;
    let entry = document.getElementById(entryId);
    if (!entry) {               // Create new entry
        weatherSection.insertAdjacentHTML('beforeend', `
            <div id="${entryId}" class="weather-box">
                <h3>${cityName}</h3>
                <p>Temperature: ${weatherData.temperature}°C</p>
                <p>Wind Speed: ${weatherData.windspeed} km/h</p>
            </div>
        `);
    } else {                    // Update existing entry
        entry.innerHTML = `
            <h3>${cityName}</h3>
            <p>Temperature: ${weatherData.temperature}°C</p>
            <p>Wind Speed: ${weatherData.windspeed} km/h</p>
        `;
    }
}

// Initial Fetch
fetchWeather();


// Update weather 
setInterval(fetchWeather, 30000);  // 30000 ms = 30 seconds