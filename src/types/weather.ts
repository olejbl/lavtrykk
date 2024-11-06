export interface WeatherData {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  meta: Meta;
  timeseries: Series[];
}

export interface Meta {
  updated_at: string;
  units: Units;
}

export interface Units {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  cloud_area_fraction: string;
  precipitation_amount: string;
  relative_humidity: string;
  wind_from_direction: string;
  wind_speed: string;
}

export interface Series {
  time: string;
  data: Data;
}

export interface Data {
  instant: Instant;
  next_12_hours?: Next12Hours;
  next_1_hours?: Next1Hours;
  next_6_hours?: Next6Hours;
}

export interface Instant {
  details: Details;
}

export interface Details {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
}

export interface Next12Hours {
  summary: Summary;
  details: object;
}

export interface Summary {
  symbol_code: string;
}

export interface Next1Hours {
  summary: Summary2;
  details: Details3;
}

export interface Summary2 {
  symbol_code: string;
}

export interface Details3 {
  precipitation_amount: number;
}

export interface Next6Hours {
  summary: Summary3;
  details: Details4;
}

export interface Summary3 {
  symbol_code: string;
}

export interface Details4 {
  precipitation_amount: number;
}
