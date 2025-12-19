"use client";

import React from "react";
import { WeatherData } from "@/lib/weather";
import { Droplets, Wind, Compass, Sun } from "lucide-react";

interface WeatherDetailsProps {
    data: WeatherData;
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const { current } = data;

    const details = [
        {
            icon: Droplets,
            label: "Humidity",
            value: `${current.humidity}%`,
        },
        {
            icon: Wind,
            label: "Wind Speed",
            value: `${current.windSpeed} km/h`,
        },
        {
            icon: Compass,
            label: "Wind Direction",
            value: `${current.windDirection}°`,
        },
        {
            icon: Sun,
            label: "UV Index",
            value: "N/A", // Open-Meteo free tier basic doesn't always have UV easily without extra params, keeping simple
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl mx-auto">
            {details.map((item, index) => (
                <div
                    key={index}
                    className="bg-card/50 hover:bg-card/80 text-card-foreground p-4 rounded-lg border border-border/40 shadow-sm backdrop-blur-md flex flex-col items-start gap-1 transition-all duration-300 group"
                >
                    <div className="flex items-center gap-2 w-full mb-1">
                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                            <item.icon size={16} />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</span>
                    </div>
                    <p className="text-xl font-bold tracking-tight pl-1">{item.value}</p>
                </div>
            ))}
        </div>
    );
}
