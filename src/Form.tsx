import React, { useState } from "react";
import "./App.css";
interface Props {
  onSubmit: (value: string) => void;
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
      onSubmit={handleSubmit}
      data-testid="form"
    >
      <input
        type="text"
        placeholder="Enter country"
        value={inputValue}
        data-testid= "input"
        style={{ fontSize: "24px", padding: "10px 20px", marginBottom: "20px" }}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button type="submit" disabled={!inputValue} data-testid ="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
