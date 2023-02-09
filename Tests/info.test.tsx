/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import Info from "../src/Info";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, act } from "@testing-library/react";

jest.mock("node-fetch", () => {
  return jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([
      {
        capital: "Test Capital",
        population: 1000000,
        latlng: [0, 0],
        flags: {
          png: "test-url"
        }
      }
    ])
  }));
});

jest.mock("node-fetch");
const fetch = require("node-fetch");

describe("Info component", () => {
  it("should call handleSubmit when form is submitted", async () => {
    // Arrange
    const data = [{ capital: "New Delhi", population: 123456789, latlng: [28.7041, 77.1025], flags: { png: 'https://restcountries.com/data/ind.svg' } }];
    fetch.mockResolvedValue({ json: () => Promise.resolve(data) });

    // Act
    const { getByTestId, findByTestId } = render(<Info />);
    const formElement = getByTestId("form");
    const inputElement = getByTestId("input");
    const submitButton = getByTestId("submit-button");

    act(() => {
      fireEvent.change(inputElement, { target: { value: "India" } });
    });
    act(() => {
      fireEvent.click(submitButton);
    });

    // Assert
    act(async () => {
      await findByTestId("country-info");
    
      const countryInfoElement = getByTestId("country-info");
      expect(countryInfoElement).toBeInTheDocument();
      expect(countryInfoElement).toHaveTextContent("Capital: New Delhi");
    });
  });
})