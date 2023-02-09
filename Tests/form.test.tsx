/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Form from "../src/components/weather/Form";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";

jest.mock("node-fetch");

describe("Form component", () => {
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the form correctly", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={onSubmit} />);
    expect(getByTestId("input")).toBeInTheDocument();
    expect(getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should call onSubmit function when form is submitted", () => {
    const onSubmit = jest.fn();
    const { getByText, getByTestId } = render(<Form onSubmit={onSubmit} />);
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "India" } });
    fireEvent.submit(getByText("Submit"));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("should disable submit button when input is empty", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={onSubmit} />);
    const submitButton = getByTestId("submit-button");
    fireEvent.submit(submitButton);
    expect(submitButton).toBeDisabled();
  });

  test("calls the onSubmit prop with the input value when the form is submitted", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={onSubmit} />);
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "test" } });
    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith("test");
  });
});
