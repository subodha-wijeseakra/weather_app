"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { searchCity, City } from "@/lib/weather";

interface SearchBarProps {
    onCitySelect: (city: City) => void;
}

export default function SearchBar({ onCitySelect }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                const cities = await searchCity(query);
                setResults(cities);
                setIsLoading(false);
                setIsOpen(true);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSelect = (city: City) => {
        onCitySelect(city);
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto z-50">
            <div className="relative flex items-center group">
                <Search size={18} className="absolute left-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full py-3 pl-12 pr-4 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-muted-foreground/60"
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
            </div>

            {isOpen && (results.length > 0 || isLoading) && (
                <ul className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    {isLoading ? (
                        <li className="p-4 text-muted-foreground text-center text-sm">Loading...</li>
                    ) : (
                        results.map((city) => (
                            <li
                                key={city.id}
                                onClick={() => handleSelect(city)}
                                className="p-3 px-4 cursor-pointer flex items-center gap-3 hover:bg-muted/50 transition-colors text-sm"
                            >
                                <MapPin size={16} className="text-muted-foreground" />
                                <span>
                                    <span className="font-medium text-foreground">{city.name}</span>
                                    <span className="text-muted-foreground ml-1">
                                        {city.admin1 ? `, ${city.admin1}` : ""}, {city.country}
                                    </span>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
