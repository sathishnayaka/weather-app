/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import WeatherInfo from "../src/components/weather/weatherInfo";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, act } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

jest.mock("node-fetch", () => {
  return jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            capital: "Test Capital",
            population: 1000000,
            latlng: [0, 0],
            flags: {
              png: "test-url",
            },
          },
        ]),
    })
  );
});

jest.mock("node-fetch");
const fetch = require("node-fetch");

const data = [
  {
    capital: "New Delhi",
    population: 123456789,
    latlng: [28.7041, 77.1025],
    flags: { png: "https://restcountries.com/data/ind.svg" },
  },
];

describe("Info component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
  it("should call handleSubmit when form is submitted", async () => {
    const { getByTestId, findByTestId } = render(<WeatherInfo />);
    const inputElement = getByTestId("input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(inputElement, { target: { value: "India" } });
    fireEvent.click(submitButton);

    act(async () => {
      await findByTestId("country-info");
      const countryInfoElement = getByTestId("country-info");
      expect(countryInfoElement).toBeInTheDocument();
      expect(countryInfoElement).toHaveTextContent("Capital: New Delhi");
    });
  });

  it("display Countries information when we click on submit button", async () => {
    const { getByTestId, findByTestId } = render(<WeatherInfo />);
    const inputElement = getByTestId("input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(inputElement, { target: { value: "India" } });
    fireEvent.click(submitButton);
    fetch.mockResolvedValue({ json: () => Promise.resolve(data) });
    act(async () => {
      const countryInfo = await findByTestId("country-info");
      expect(countryInfo).toBeInTheDocument();
    });
  });
});
