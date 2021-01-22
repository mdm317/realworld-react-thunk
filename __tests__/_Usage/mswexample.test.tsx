import "@testing-library/jest-dom";
import { render, fireEvent, screen, within } from "@testing-library/react";
import axios, { AxiosError } from "axios";
import { rest } from "msw";

import { setupServer } from "msw/node";

import React, { useEffect } from "react";
// import Hello from "./Hello";
const Hello = () => {
  useEffect(() => {
    axios
      .get("https://conduit/url/test?id=123", {
        headers: { Authorization: "Token 341" },
      })
      .then((res) => {
        console.log(res.data);
        const h1 = document.querySelector("h1");
        if (h1) {
          h1.innerHTML = res.data;
        }
      })
      .catch((e: AxiosError) => {
        console.log("error", e.message);
      });
  }, []);
  return <h1>Hello</h1>;
};

const server = setupServer();

beforeAll(() => {
  server.listen();
});
beforeEach(() => {
  server.use(
    rest.get("https://conduit/url/test", (req, res, ctx) => {
      console.log("req.url", req.url);
      console.log("req.url.searchParams", req.url.searchParams);
      const id = req.url.searchParams.get("id");
      console.log("id", id);

      console.log("req.headers", req.headers);
      return res(ctx.json("hi"));
    })
  );
});
const url = "https://conduit.productionready.io/api";
// test("should ", async () => {
//   render(<Hello />);
//   expect(screen.getByText("Hello")).toBeVisible();
//   expect(await screen.findByText("hi")).toBeVisible();
//   // expect(await screen.findByText("alert")).toHaveTextContent("hi");
// });
test(" ", async () => {
  server.use(
    rest.get(url + "/articles", (req, res, ctx) => {
      return res(ctx.json("hi"));
    })
  );
  //시간초과가 남 404 를 줄순 없나?
  const response = await axios.get(url + "/articles");
  console.log(response.data);
});
