import "@testing-library/jest-dom";
import { render, fireEvent, screen, within } from "@testing-library/react";
import React from "react";
const Hello = () => {
  return <input readOnly value="sdf"></input>;
};
test("", () => {
  render(<Hello />);
  screen.getByText("sdf");
});
