import "@testing-library/jest-dom";
import * as React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { fireEvent, screen } from "@testing-library/react";
import SignUp from "../src/Pages/SignUp";
import { url } from "../src/db";
import { destroyToken } from "../src/Jwt/jwt";
import { renderDefault } from "./util";
import { userFakeResponse } from "./ApiResponse/user";
const server = setupServer();

const fakeErrorResponse = {
  errors: {
    email: ["is invalid"],
    password: ["is too short (minimum is 8 characters)"],
    username: ["has already been taken"],
  },
};
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  destroyToken();
});
afterAll(() => server.close());

test("signup fail", async () => {
  server.use(
    rest.post(url + "/users", (req, res, ctx) => {
      return res(ctx.status(402), ctx.json(fakeErrorResponse));
    })
  );
  renderDefault(<SignUp />);

  //폼 입력
  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "name" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "email" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password" },
  });
  //폼 제출
  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //실패 알림 메시지 찾음
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/check error message/i);

  //에러 메시지들이 화면에 표시되어야 한다.
  for (const errorTitle in fakeErrorResponse.errors) {
    // console.log((fakeErrorResponse.errors as any)[errorTitle]);
    for (const errorContent of (fakeErrorResponse.errors as any)[errorTitle]) {
      const errorMessage = errorTitle + " " + errorContent;
      //   console.log(errorMessage);
      expect(await screen.findByText(errorMessage)).toBeVisible();
    }
  }
});
test("sign up success", async () => {
  server.use(
    rest.post(url + "/users", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userFakeResponse));
    })
  );

  const { history } = renderDefault(<SignUp />);

  //폼 입력
  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "name" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "email" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password" },
  });

  //폼제출
  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //성공알림 메시지 찾음
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/Signup Success/i);

  //로그인으로 이동
  expect(history.location.pathname).toBe("/login");
});
