import React, { useState } from "react";
import Form from "./Form";
import CountryInfo from "./CountryInfo";
import fetch from "node-fetch";

interface Country {
  capital: string;
  population: number;
  latlng: [number, number];
  flags: {
    png: string;
  };
}

const WeatherInfo: React.FC = () => {
  const [countries, setCounties] = useState<Country[] | null>(null);

  const handleSubmit = async (value: string) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${value}`
      );
      if (response.status === 200) {
        const data: any = await response.json();
        setCounties(data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      {countries?.map((country, index) => (
        <div key={index} data-testid="country-info">
          <CountryInfo country={country} />
        </div>
      ))}
    </div>
  );
};

export default WeatherInfo;
