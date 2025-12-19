"use client";

import React from "react";
import { WeatherData } from "@/lib/weather";
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake } from "lucide-react";

interface CurrentWeatherProps {
    data: WeatherData;
    city: string;
}

export default function CurrentWeather({ data, city }: CurrentWeatherProps) {
    const { current, daily } = data;
    const temp = Math.round(current.temperature);
    const high = Math.round(daily.temperatureMax[0]);
    const low = Math.round(daily.temperatureMin[0]);

    const renderIcon = () => {
        const code = current.weatherCode;
        // WMO Weather interpretation codes (WW)
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

        const iconProps = {
            size: 120,
            strokeWidth: 1.5,
            className: "text-foreground drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        };

        if (code <= 1) return <Sun {...iconProps} />;
        if (code <= 3) return <Cloud {...iconProps} />;
        if (code <= 48) return <Cloud {...iconProps} />; // Fog as cloud for simplicity
        if (code >= 95) return <CloudLightning {...iconProps} />;
        if (code >= 71) return <Snowflake {...iconProps} />;
        if (code >= 50) return <CloudRain {...iconProps} />;

        return <Sun {...iconProps} />;
    };



    return (
        <div className="relative overflow-hidden p-8 rounded-xl border border-border/10 dark:border-white/10 bg-card/30 backdrop-blur-md flex flex-col justify-between h-full shadow-sm dark:shadow-2xl">


            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-medium tracking-tight text-muted-foreground mb-1">{city}</h2>
                        <div className="text-8xl font-bold tracking-tighter text-foreground">
                            {temp}°
                        </div>
                    </div>
                    <div className="pt-2 pr-2 animate-in fade-in zoom-in duration-700">
                        {renderIcon()}
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <span className="uppercase tracking-wider text-xs">High</span>
                        <span className="text-foreground text-base">{high}°</span>
                    </div>
                    <div className="w-[1px] h-4 bg-border" />
                    <div className="flex items-center gap-1">
                        <span className="uppercase tracking-wider text-xs">Low</span>
                        <span className="text-foreground text-base">{low}°</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
