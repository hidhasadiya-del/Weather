
export async function getWeather(city) {
    const apikey = import.meta.env.VITE_WEATHER_APIKEY;

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather");
    }

    return {
        location: {
            name: data.name
        },
        current: {
            temp_c: Math.round(data.main.temp),
            condition: {
                text: data.weather[0].description
            },
            humidity: data.main.humidity,
            wind_kph: data.wind.speed
        }
    };
}
