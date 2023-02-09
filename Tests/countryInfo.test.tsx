/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  act,
} from "@testing-library/react";
import CountryInfo from "../src/components/weather/CountryInfo";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";

afterEach(cleanup);
jest.mock('node-fetch');

const mockCountry = {
  capital: "London",
  population: 8000000,
  latlng: [51.5074, 0.1278],
  flags: { png: "flag-url" },
};

describe("CountryInfo", () => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("displays the country capital, population, latitude, longitude, and flag", () => {
    const { getByTestId } = render(<CountryInfo country={mockCountry} />);

    expect(getByTestId("capital").textContent).toBe(
      `Capital: ${mockCountry.capital}`
    );
    expect(getByTestId("population").textContent).toBe(
      `Population: ${mockCountry.population}`
    );
    expect(getByTestId("lat").textContent).toBe(
      `Latitude: ${mockCountry.latlng[0]}`
    );
    expect(getByTestId("lang").textContent).toBe(
      `Longitude: ${mockCountry.latlng[1]}`
    );
    expect(getByTestId("img")).toHaveAttribute("src", mockCountry.flags.png);
  });

  it("displays the weather info after the weather button is clicked", async () => {
    const mockWeather = {
      temperature: 20,
      weather_icons: ["01d"],
      wind_speed: 5,
      precipitation: 0,
    };

    const { getByText, findByTestId, getByTestId } = render(
      <CountryInfo country={mockCountry} />
    );

    // Mocking the fetch call to the weather API
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ current: mockWeather }),
      })
    );
    fireEvent.click(getByText("Capital Weather"));

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(async () => {
      const temp = await findByTestId("temp");
      const weatherIcon = await findByTestId("weather-icon");
      const wind = await findByTestId("wind");
      const prep = await findByTestId("prep");
      expect(temp).toBeInTheDocument();
      expect(weatherIcon).toBeInTheDocument();
      expect(wind).toBeInTheDocument();
      expect(prep).toBeInTheDocument();
    });
  });
});
