import "@testing-library/jest-dom";
import { render, fireEvent, screen, within } from "@testing-library/react";

import React from "react";
// import Hello from "./Hello";
import marked from "marked";

const Hello = () => {
  return (
    <form aria-label="Add a comment">
      <input></input>
    </form>
  );
};
//form 에 aria-label 을 추가 안하면 role 로 얻어올수 없다.
test("should ", () => {
  render(<Hello />);
  const el = screen.getByRole("form", { name: /Add a comment/ });
  console.log(el);
});
