"use client";

import React from "react";
import { WeatherData } from "@/lib/weather";
import { Cloud, CloudRain, Sun } from "lucide-react";

interface ForecastProps {
    data: WeatherData;
}

export default function Forecast({ data }: ForecastProps) {
    const { daily } = data;

    // Helper to get day name
    const getDayName = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { weekday: "short" });
    };

    const renderIcon = (code: number) => {
        if (code <= 1) return <Sun size={20} className="text-yellow-500" style={{ color: "#fbbf24" }} />;
        if (code <= 3) return <Cloud size={20} className="text-gray-400" style={{ color: "#9ca3af" }} />;
        return <CloudRain size={20} className="text-blue-400" style={{ color: "#60a5fa" }} />;
    };

    return (
        <div className="bg-card/50 text-card-foreground p-5 rounded-lg border border-border/40 shadow-sm backdrop-blur-md h-full">
            <h3 className="text-sm font-semibold mb-3 tracking-wide text-muted-foreground uppercase">7-Day Forecast</h3>
            <div className="flex flex-col gap-1">
                {daily.time.map((time, index) => (
                    <div
                        key={time}
                        className="flex items-center justify-between py-2 hover:bg-muted/30 px-2 rounded-md transition-colors"
                    >
                        <span className="text-sm font-medium text-foreground w-12">
                            {index === 0 ? "Today" : getDayName(time)}
                        </span>

                        <div className="flex items-center gap-2">
                            {renderIcon(daily.weatherCode[index])}
                            <span className="text-xs text-muted-foreground hidden sm:block w-12">
                                {daily.weatherCode[index] <= 1 ? "Sunny" : daily.weatherCode[index] <= 3 ? "Cloudy" : "Rainy"}
                            </span>
                        </div>

                        <div className="flex gap-3 font-mono text-sm">
                            <span className="font-medium">{Math.round(daily.temperatureMax[index])}°</span>
                            <span className="text-muted-foreground">{Math.round(daily.temperatureMin[index])}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
