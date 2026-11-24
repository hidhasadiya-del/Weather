export async function getWeather(city) {
    const apikey =
        import.meta.env.VITE_OPENWEATHER_APIKEY ||
        import.meta.env.VITE_WEATHER_APIKEY;

    if (!apikey) {
        throw new Error("Weather API key is missing");
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.message;

        if (response.status === 401) {
            throw new Error("Invalid OpenWeather API key");
        }

        if (response.status === 404) {
            throw new Error("City not found");
        }

        throw new Error(message || "Unable to fetch weather");
    }

    const data = await response.json();

    return {
        location: {
            name: data.name,
        },
        current: {
            temp_c: Math.round(data.main.temp),
            condition: {
                text: data.weather[0].description,
            },
            humidity: data.main.humidity,
            wind_kph: Math.round(data.wind.speed),
        },
    };
}