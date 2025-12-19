export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
}

export interface WeatherData {
    current: {
        temperature: number;
        weatherCode: number;
        windSpeed: number;
        windDirection: number;
        humidity: number;
        isDay: number;
        time: string;
    };
    daily: {
        time: string[];
        weatherCode: number[];
        temperatureMax: number[];
        temperatureMin: number[];
        sunrise: string[];
        sunset: string[];
    };
    hourly: {
        time: string[];
        temperature: number[];
        weatherCode: number[];
    };
}

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(query: string): Promise<City[]> {
    if (!query || query.length < 2) return [];

    try {
        const response = await fetch(
            `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching city:", error);
        return [];
    }
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData | null> {
    try {
        const params = new URLSearchParams({
            latitude: lat.toString(),
            longitude: lon.toString(),
            current: "temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m",
            hourly: "temperature_2m,weather_code",
            daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
            timezone: "auto",
        });

        const response = await fetch(`${WEATHER_API}?${params.toString()}`);
        const data = await response.json();

        return {
            current: {
                temperature: data.current.temperature_2m,
                weatherCode: data.current.weather_code,
                windSpeed: data.current.wind_speed_10m,
                windDirection: data.current.wind_direction_10m,
                humidity: data.current.relative_humidity_2m,
                isDay: data.current.is_day,
                time: data.current.time,
            },
            daily: {
                time: data.daily.time,
                weatherCode: data.daily.weather_code,
                temperatureMax: data.daily.temperature_2m_max,
                temperatureMin: data.daily.temperature_2m_min,
                sunrise: data.daily.sunrise,
                sunset: data.daily.sunset,
            },
            hourly: {
                time: data.hourly.time,
                temperature: data.hourly.temperature_2m,
                weatherCode: data.hourly.weather_code,
            },
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}

export function getWeatherIcon(code: number, isDay: number = 1): string {
    // WMO Weather interpretation codes (WW)
    // https://open-meteo.com/en/docs
    // 0: Clear sky
    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    // 45, 48: Fog and depositing rime fog
    // 51, 53, 55: Drizzle: Light, moderate, and dense intensity
    // 56, 57: Freezing Drizzle: Light and dense intensity
    // 61, 63, 65: Rain: Slight, moderate and heavy intensity
    // 66, 67: Freezing Rain: Light and heavy intensity
    // 71, 73, 75: Snow fall: Slight, moderate, and heavy intensity
    // 77: Snow grains
    // 80, 81, 82: Rain showers: Slight, moderate, and violent
    // 85, 86: Snow showers slight and heavy
    // 95: Thunderstorm: Slight or moderate
    // 96, 99: Thunderstorm with slight and heavy hail

    // Mapping to Lucide icon names or custom logic
    // For now, returning a description or class name helper
    // Ideally, this returns a component or icon name.
    // Let's return a simple string description for now, the component will handle the icon.
    return "cloud"; // Placeholder
}
