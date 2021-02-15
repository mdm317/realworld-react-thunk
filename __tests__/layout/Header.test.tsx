import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { loginSucAction } from "../../src/Redux/User/action";
import { userFakeResponse } from "../ApiResponse/user";
import { renderDefault } from "../util";
import Header from "../../src/Component/Layout/Header";

test("비로그인시 home signup 링크만 보여야 한다. ", () => {
  renderDefault(<Header />);
  expect(screen.getByText(/home/i)).toBeVisible();
  expect(screen.getByText(/sign up/i)).toBeVisible();
  expect(screen.getByText(/log in/i)).toBeVisible();

  expect(screen.queryByText(/log out/i)).toBeNull();
  expect(screen.queryByText(/new post/i)).toBeNull();
  expect(screen.queryByText(/setting/i)).toBeNull();
});

test("로그인시 new post ,log out, home,setting 만 보여야한다 . ", async () => {
  const user = userFakeResponse.user;
  const { store } = renderDefault(<Header />);
  store.dispatch(loginSucAction(user));
  expect(await screen.findByText(/new post/i)).toBeVisible();
  expect(await screen.findByText(/log out/i)).toBeVisible();
  expect(await screen.findByText(/home/i)).toBeVisible();
  expect(await screen.findByText(/setting/i)).toBeVisible();
  expect(screen.queryByText(/home/i)).toBeVisible();

  expect(screen.queryByText(/sign up/i)).toBeNull();
  expect(screen.queryByText(/log in/i)).toBeNull();
});
