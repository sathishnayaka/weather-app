import { useState } from "react";
import "./App.css";
interface Weather {
  temperature: number;
  weather_icons: string[];
  wind_speed: number;
  precipitation: number;
}
interface Country {
  capital: string;
  population: number;
  latlng: number[];
  flags: {
    png: string;
  };
}
const CountryInfo: React.FC<{ country: Country }> = ({ country }) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  const handleCapitalWeather = async () => {
    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=8112e577973b17844835bd16b8bf4c59&query=${country.capital}`
      );
      const data = await response.json();
      if (data.temperature) {
        setWeather({
          temperature: data.current.temperature,
          weather_icons: data.current.weather_icons.map((w: any) => w.icon),
          wind_speed: data.current.wind_speed,
          precipitation: data.current.precip,
        });
      } else {
        alert(data.error.info);
      }
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <div className="country-info">
      <p data-testid="capital">Capital: {country.capital}</p>
      <p data-testid="population">Population: {country.population}</p>
      <p data-testid="lat">Latitude: {country.latlng[0]}</p>
      <p data-testid="lang">Longitude: {country.latlng[1]}</p>
      <img
        data-testid="img"
        src={country.flags.png}
        alt={`Flag of ${country.capital}`}
        width="100px"
        height={"100px"}
        style={{ marginBottom: "30px" }}
      />
      <button onClick={handleCapitalWeather} id="button-capital">
        Capital Weather
      </button>
      {weather && (
        <div className="weather-info">
          <p data-testid="temp">Temperature: {weather.temperature}</p>
          {weather.weather_icons.map((icon) => (
            <img
              key={icon}
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Weather icon"
              data-testid="weather-icon"
            />
          ))}
          <p data-testid="wind">Wind Speed: {weather.wind_speed}</p>
          <p data-testid="prep">Precipitation: {weather.precipitation}</p>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
