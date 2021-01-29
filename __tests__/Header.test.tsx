import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import Header from "../src/Component/Layout/Header";
import makeStore from "../src/Redux";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom";
import { loginSucAction } from "../src/Redux/User/action";
import { userFakeResponse } from "./ApiResponse/user";
import { History } from "history";

let history: History;
let store: ReturnType<typeof makeStore>;
beforeEach(() => {
  history = createMemoryHistory();
  store = makeStore();
  render(
    <Provider store={store}>
      <Router history={history}>
        <Header />
      </Router>
      <ToastContainer />
    </Provider>
  );
});
test("비로그인시 home signup 링크만 보여야 한다. ", () => {
  expect(screen.getByText(/home/i)).toBeVisible();
  expect(screen.getByText(/sign up/i)).toBeVisible();

  expect(screen.queryByText(/log out/i)).toBeNull();
  expect(screen.queryByText(/new post/i)).toBeNull();
  expect(screen.queryByText(/setting/i)).toBeNull();
});

test("로그인시 new post ,log out, home,setting 만 보여야한다 . ", async () => {
  const user = userFakeResponse.user;
  store.dispatch(loginSucAction(user));
  expect(await screen.findByText(/new post/i)).toBeVisible();
  expect(await screen.findByText(/log out/i)).toBeVisible();
  expect(await screen.findByText(/home/i)).toBeVisible();
  expect(await screen.findByText(/setting/i)).toBeVisible();
  expect(screen.queryByText(/home/i)).toBeVisible();

  expect(screen.queryByText(/sign up/i)).toBeNull();
});
