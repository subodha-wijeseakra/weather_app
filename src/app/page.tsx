"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/WeatherDetails";
import Forecast from "@/components/Forecast";
import ThemeToggle from "@/components/ThemeToggle";
import { getWeather, WeatherData, City } from "@/lib/weather";
import dynamic from "next/dynamic";

const WeatherMap = dynamic(() => import("@/components/WeatherMap"), { ssr: false });

export default function Home() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("Colombo");
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }>({ lat: 6.9271, lon: 79.8612 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeather(lat, lon);
      if (weather) {
        setData(weather);
        setCity(cityName);
        setCoordinates({ lat, lon });
      } else {
        setError("Failed to fetch weather data.");
      }
    } catch (err) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse Geocoding to get City Name
          try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const geoData = await response.json();
            const cityName = geoData.city || geoData.locality || "Your Location";
            fetchWeather(latitude, longitude, cityName);
          } catch (e) {
            console.error("Reverse geocoding failed", e);
            fetchWeather(latitude, longitude, "Your Location");
          }
        },
        (error) => {
          let errorMessage = error.message;
          if (error.code === 2) errorMessage = "Position Unavailable (check OS location settings)";
          if (error.code === 1) errorMessage = "Permission Denied";

          console.warn("Geolocation skipped:", errorMessage, "- Defaulting to Colombo");
          // Fallback to Colombo
          fetchWeather(6.9271, 79.8612, "Colombo");
        },
        { timeout: 10000 }
      );
    } else {
      // Fallback if geolocation is not supported
      fetchWeather(6.9271, 79.8612, "Colombo");
    }
  }, []);

  const handleCitySelect = (selectedCity: City) => {
    fetchWeather(selectedCity.latitude, selectedCity.longitude, selectedCity.name);
  };

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Weather App</h1>
        <ThemeToggle />
      </header>

      <div className="mb-8 max-w-md mx-auto relative z-10 text-center">
        <div className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-gradient-to-tr from-primary to-purple-500 rounded-full" />
        <SearchBar onCitySelect={handleCitySelect} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-center">
          <p>{error}</p>
        </div>
      ) : data ? (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrentWeather data={data} city={city} />
            <Forecast data={data} />
          </div>
          <WeatherDetails data={data} />
          <div className="w-full">
            <WeatherMap lat={coordinates.lat} lon={coordinates.lon} city={city} data={data} />
          </div>
        </div>
      ) : null}

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50 overflow-hidden">

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px),
                                linear-gradient(to bottom, #80808012 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>
    </main>
  );
}
