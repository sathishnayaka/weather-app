/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../src/Form';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

describe('Form component', () => {
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the form correctly', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<Form onSubmit={onSubmit} />);
    expect(getByPlaceholderText('Enter country')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should call onSubmit function when form is submitted', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<Form onSubmit={onSubmit} />);
    const input = getByPlaceholderText('Enter country');
    fireEvent.change(input, { target: { value: 'India' } });
    fireEvent.submit(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should disable submit button when input is empty', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<Form onSubmit={onSubmit} />);
    const input = getByPlaceholderText('Enter country');
    const submitButton = getByText('Submit');
    fireEvent.submit(submitButton);
    expect(submitButton).toBeDisabled();
  });

  test("calls the onSubmit prop with the input value when the form is submitted", () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<Form onSubmit={onSubmit} />);
    const inputField = getByPlaceholderText("Enter country");
    fireEvent.change(inputField, { target: { value: "test" } });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith("test");
  });

});
