
import { useState } from "react";
import { getWeather } from "../services/weatherService";
import SearchBar from "./SearchBar";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        if (!city.trim()) {
            setError("Enter a city name");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await getWeather(city);
            setWeather(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unable to fetch weather");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="weather-app">
            <h1>Weather Forecast</h1>
            <p className="subtitle">Enter your city to check the weather</p>

            <SearchBar
                city={city}
                setCity={setCity}
                onSearch={handleSearch}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {weather && (
                <div className="weather-card">
                    <h2>{weather.location.name}</h2>
                    <p className="temperature">{weather.current.temp_c}°C</p>
                    <p className="condition">{weather.current.condition.text}</p>
                    <div className="weather-meta">
                        <p>Humidity: {weather.current.humidity}%</p>
                        <p>Wind Speed: {weather.current.wind_kph} m/s</p>
                    </div>
                </div>
            )}

            <footer>Weather App © 2026</footer>
        </main>
    );
}

export default Weather;
