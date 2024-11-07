import { ImageResponse } from "next/og";
import { type WeatherData } from "~/types/weather";

type GeoData = {
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
};

export async function GET() {
  const weatherRes = await fetch(
    // `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58`,
  );
  const weatherData = (await weatherRes.json()) as WeatherData;

  if (!weatherRes.ok) {
    console.error("Error fetching weather data:", weatherData);
    throw new Error("Unable to fetch weather data");
  }

  const airPressure =
    weatherData.properties.timeseries[0]?.data.instant.details
      .air_pressure_at_sea_level;
  const pressureStatus = airPressure
    ? airPressure > 1013
      ? "Høytrykk"
      : "Lavtrykk"
    : "Unavailable";

  // Calculate red intensity based on pressure difference
  const pressureDifference = airPressure ? Math.abs(airPressure - 1013) : 0;
  const maxDifference = 50; // Maximum difference for full red color
  const normalizedDifference = Math.min(pressureDifference / maxDifference, 1);
  const redIntensity = Math.floor(normalizedDifference * 255);
  const color = `rgb(${redIntensity}, 0, 0)`;
  return new ImageResponse(
    (
      <div
        style={{ backgroundColor: color }}
        tw="flex flex-col w-full h-full items-center justify-center"
      >
        <p>Updated at: {weatherData.properties.meta.updated_at}</p>
        <p>Timestamp: {new Date().toISOString()}</p>
        <h2 tw="text-3xl sm:text-4xl font-bold tracking-tight text-black bg-gray-400 text-left">
          Lufttrykk i Oslo ( {airPressure} )
        </h2>
        <p style={{ color }}>{airPressure} hPa</p>
        <h2 tw="text-3xl sm:text-4xl font-bold tracking-tight text-black bg-gray-400 text-left">
          Status: {pressureStatus}
        </h2>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
