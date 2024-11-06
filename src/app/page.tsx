import { type WeatherData } from "~/types/weather";

type GeoData = {
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
};

export default async function Page() {
  const ip = "95.101.10.80"; //yr.no

  if (!ip) {
    console.error("Could not determine IP address.");
    return <p>Unable to determine your IP address.</p>;
  }

  // Fetch geolocation data
  const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
  const geoData = (await geoRes.json()) as GeoData;

  if (!geoRes.ok) {
    console.error("Error fetching geolocation data:", geoData);
    return <p>Unable to determine your location.</p>;
  }

  const { latitude, longitude } = geoData;

  // Fetch weather data
  const weatherRes = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
  );
  const weatherData = (await weatherRes.json()) as WeatherData;

  if (!weatherRes.ok) {
    console.error("Error fetching weather data:", weatherData);
    return <p>Unable to fetch weather data.</p>;
  }

  const airPressure =
    weatherData.properties.timeseries[0]?.data.instant.details
      .air_pressure_at_sea_level;
  const pressureStatus = airPressure
    ? airPressure > 1013
      ? "High"
      : "Low"
    : "Unavailable";

  return (
    <div>
      <h1>Air Pressure at Your Location</h1>
      <p>
        Location: {geoData.city}, {geoData.region}, {geoData.country_name}
      </p>
      <p>Air Pressure: {airPressure} hPa</p>
      <p>Pressure Status: {pressureStatus}</p>
    </div>
  );
}
