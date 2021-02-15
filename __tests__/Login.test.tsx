import "@testing-library/jest-dom";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import Login from "../src/Pages/Login";
import { url } from "../src/db";
import { getToken, destroyToken } from "../src/Jwt/jwt";
import { userFakeResponse } from "./ApiResponse/user";
import { renderDefault } from "./util";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  destroyToken();
});
afterAll(() => server.close());
test("로그인 실패시 에러메세지 화면에 표시", async () => {
  server.use(
    rest.post(url + "/users/login", (req, res, ctx) => {
      return res(
        ctx.status(402),
        ctx.json({ errors: { "email or password": ["is invalid"] } })
      );
    })
  );
  renderDefault(<Login />);

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "gpffh@a.a" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "gpffh123" },
  });

  //log in 버튼 클릭
  fireEvent.click(screen.getByRole("button", { name: /log in/i }));

  const alert = await screen.findByRole("alert");
  //toast message 로 check error message 를 표시한다.
  expect(alert).toHaveTextContent(/check error message/i);

  //error의 내용이 화면에 나타났는지 확인한다.
  expect(
    await screen.findByText(/email or password is invalid/i)
  ).toBeVisible();

  //token 이 저장되지 않아야한다.
  expect(getToken()).toBeNull();
});

test("로그인 성공시 홈으로 이동", async () => {
  server.use(
    rest.post(url + "/users/login", (req, res, ctx) => {
      return res(ctx.json(userFakeResponse));
    })
  );
  const { history } = renderDefault(<Login />);

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "gpffh@a.a" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "gpffh12" },
  });
  const submitBtn = screen.getByRole("button", { name: /log in/i });
  fireEvent.click(submitBtn);

  //toast elem  이 생기는것을 찾는다.
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/login success/i);
  expect(history.location.pathname).toBe("/");
  expect(getToken()).toEqual(userFakeResponse.user.token);
});
