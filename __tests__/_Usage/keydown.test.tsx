import "@testing-library/jest-dom";
import { render, fireEvent, screen, within } from "@testing-library/react";
import axios, { AxiosError } from "axios";
import { rest } from "msw";

import { setupServer } from "msw/node";

import React from "react";
// import Hello from "./Hello";
const Hello = () => {
  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("keydown");
    console.log("key", event.key);
    (event.target as HTMLInputElement).value =
      (event.target as HTMLInputElement).value + event.key;
    // console.log(e.target.value);
  };
  return <input placeholder="input" onKeyDown={handleKeydown}></input>;
};
test("should ", () => {
  const { debug } = render(<Hello />);
  const el = screen.getByPlaceholderText("input") as HTMLInputElement;
  fireEvent.keyDown(el, { key: "A", code: "KeyA" });
  console.log(
    "value",
    (screen.getByPlaceholderText("input") as HTMLInputElement).value
  );
  debug();
});
