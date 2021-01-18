import "@testing-library/jest-dom";
import { render, fireEvent, screen, within } from "@testing-library/react";
import axios, { AxiosError } from "axios";
import { rest } from "msw";
import { createMemoryHistory } from "history";
import { History } from "history";

import { setupServer } from "msw/node";

import React, { useEffect } from "react";
import { BrowserRouter, Router } from "react-router-dom";
// import Hello from "./Hello";
const Hello = () => {
  return <h1>Hello</h1>;
};

const server = setupServer();

beforeAll(() => {
  server.listen();
});
describe("scope", () => {
  let history: History;
  let store;
  let debug: () => void;
  beforeAll(() => {
    history = createMemoryHistory();
    //test 가 끝나면 알아서 초기화 되는듯
    const rendered = render(
      <Router history={history}>
        <Hello />
      </Router>
    );
    debug = rendered.debug;
  });
  test("should ", async () => {
    // render(<Hello />);
    // expect(screen.getByText("Hello")).toBeVisible();

    debug();
  });
  test("should ", async () => {
    // expect(screen.getByText("Hello")).toBeVisible();
    debug();
  });
});
