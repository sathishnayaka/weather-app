/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, cleanup, findByText, getByTestId, findByTestId, act } from '@testing-library/react';
import CountryInfo from '../src/CountryInfo';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

afterEach(cleanup);

const mockCountry = {
  capital: 'London',
  population: 8000000,
  latlng: [51.5074, 0.1278],
  flags: { png: 'flag-url' },
};

describe('CountryInfo', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    fetchMock.enableMocks();
  });
  
  afterEach(() => {
    fetchMock.resetMocks();
  });
  
  it('displays the country capital, population, latitude, longitude, and flag', () => {
    const { getByText,getByRole } = render(<CountryInfo country={mockCountry} />);

    expect(getByText(`Capital: ${ mockCountry.capital}`)).toBeInTheDocument();
    expect(getByText(`Population: ${mockCountry.population}`)).toBeInTheDocument();
    expect(getByText(`Latitude: ${mockCountry.latlng[0]}`)).toBeInTheDocument();
    expect(getByText(`Longitude: ${mockCountry.latlng[1]}`)).toBeInTheDocument();
    expect(getByRole("img", { name: `Flag of ${mockCountry.capital}` })).toBeInTheDocument();
  });

  it('displays the weather info after the weather button is clicked', async () => {
    const mockWeather = {
      temperature: 20,
      weather_icons: ['01d'],
      wind_speed: 5,
      precipitation: 0,
    };

    const { getByText, getByAltText, findByTestId ,getByTestId } = render(<CountryInfo country={mockCountry} />);
    
// Mocking the fetch call to the weather API
window.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ current: mockWeather }),
  })
);
fireEvent.click(getByText('Capital Weather'));

// eslint-disable-next-line testing-library/no-unnecessary-act
act(async () => {
  await findByTestId("temp");
  expect(getByTestId("temp")).toBeInTheDocument();
expect(getByAltText("weather")).toBeInTheDocument();
expect(getByText("wind")).toBeInTheDocument();
expect(getByText("prep")).toBeInTheDocument();
});
// Waiting for the state update with the weather info
})
})
