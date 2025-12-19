"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { WeatherData } from "@/lib/weather";

interface WeatherMapProps {
    lat: number;
    lon: number;
    city: string;
    data: WeatherData;
}

// Fix for default Leaflet marker icon missing assets in Next.js
const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom(), { animate: false });
    }, [center, map]);
    return null;
}

export default function WeatherMap({ lat, lon, city, data }: WeatherMapProps) {
    const position: [number, number] = [lat, lon];
    const { current } = data;

    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-border/10">
            <MapContainer
                key={`${lat}-${lon}`}
                center={position}
                zoom={10}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
            >
                <ChangeView center={position} />
                <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold text-lg">{city}</h3>
                            <p>{Math.round(current.temperature)}°C</p>
                            <p className="capitalize">{/* Weather condition text could go here */}</p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
