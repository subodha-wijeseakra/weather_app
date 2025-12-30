# 🌦️ Weather App

> A modern, beautiful, and responsive weather application built with Next.js 15, Tailwind CSS, and Open-Meteo API.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)

## 🚀 Overview

This Weather App provides real-time weather updates, detailed forecasts, and interactive maps for any location worldwide. Built with performance and user experience in mind, it features a sleek UI with dark/light mode support, automatic geolocation, and fast data fetching.

## ✨ Features

-   **📍 Automatic Geolocation**: key feature that automatically detects your location to show local weather instantly.
-   **🌍 Global Search**: Search for any city worldwide with reverse geocoding support.
-   **🌡️ Real-time Data**: Current temperature, humidity, wind speed, pressure, and more.
-   **📅 7-Day Forecast**: Weekly weather trends to help you plan ahead.
-   **🗺️ Interactive Map**: specific Visual weather map using Leaflet to explore precipitation and clouds.
-   **🌗 Dark/Light Mode**: Fully themable UI that adapts to your system preference or manual toggle.
-   **⚡ Fast & Responsive**: Optimized for speed with Next.js server/client components and responsive for all devices.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Maps**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
-   **Data Provider**: [Open-Meteo API](https://open-meteo.com/) (Weather) & [BigDataCloud](https://www.bigdatacloud.com/) (Geocoding)

## 📦 Installation

Getting started is easy. Follow these steps to run the project locally.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in your browser**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## 📂 Project Structure

```bash
├── 📁 src
│   ├── 📁 app          # Next.js App Router pages
│   ├── 📁 components   # Reusable UI components (WeatherMap, Forecast, etc.)
│   ├── 📁 lib          # Utility functions and API calls
│   └── 📁 styles       # Global styles and Tailwind config
├── 📄 public           # Static assets (images, icons)
├── 📄 tailwind.config.ts # Tailwind CSS configuration
└── 📄 package.json     # Project dependencies and scripts
```

## 🔧 Configuration

The app is designed to work out-of-the-box without complex configuration.
-   **API**: No API keys are required for Open-Meteo.
-   **Tailwind**: Configured in `tailwind.config.ts` and `src/app/globals.css`.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Subodha Wijesekara
