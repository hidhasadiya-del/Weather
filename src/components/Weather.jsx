
import { useState } from "react";
import { getWeather } from "../services/weatherService";
import SearchBar from "./SearchBar";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    async function handleSearch() {
        if (city === "") {
            alert("Enter a city name");
            return;
        }

        try {
            const data = await getWeather(city);
            setWeather(data);
        } catch {
            alert("City not found or API error");
        }
    }

    return (
        <main className="weather-app">
            <h1>Weather App</h1>

            <SearchBar
                city={city}
                setCity={setCity}
                onSearch={handleSearch}
            />

            {weather && (
                <div>
                    <h2>{weather.location.name}</h2>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Condition: {weather.current.condition.text}</p>
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Wind: {weather.current.wind_kph} km/h</p>
                </div>
            )}
        </main>
    );
}

export default Weather;
