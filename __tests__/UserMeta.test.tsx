import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import Layout from "../src/Component/Layout/Layout";
import makeStore from "../src/Redux";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom";
import { loginSucAction } from "../src/Redux/User/action";
import { fakeUserResponse } from "./ApiResponse/user";
import { History } from "history";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../src/db";
import { destroyToken, storeToken } from "../src/Jwt/jwt";
import { renderDefault } from "./util";
import UserMeta from "../src/Component/UserMeta";
import {
  articleFakeResponse,
  articlesFakeResponse,
} from "./ApiResponse/article";
const server = setupServer();

const article = articleFakeResponse.article;

beforeAll(() => {
  server.listen();
  server.use(
    rest.post(url + "/articles/:slug/favorite", (req, res, ctx) => {
      const { slug } = req.params;
      console.log(slug);
      return res(ctx.json(article));
    })
  );
});

afterAll(() => server.close());

test(`로그인 전에는 
you need to login 이라는 알람창이 뜨게 한다. `, async () => {
  const currentFavoriteCount = article.favoritesCount;
  renderDefault(<UserMeta article={article} />);
  const favoriteBtn = screen.getByRole("button");

  fireEvent.click(favoriteBtn);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/you need to login/i);
});

test(`로그인 후에는 favorite 카운트가 변경된다. `, async () => {
  const article = articleFakeResponse.article;
  const currentFavoriteCount = article.favoritesCount;
  const { store } = renderDefault(<UserMeta article={article} />);

  //로그인 성공 가정
  store.dispatch(loginSucAction(fakeUserResponse.user));

  const favoriteBtn = screen.getByRole("button");

  //favorite 버튼을 누르면 favorite 카운트가 늘어난다.
  fireEvent.click(favoriteBtn);
  await screen.findByText(currentFavoriteCount + 1);

  //이미 favorite 된 상태면 favorite 카운트가 다시 줄어든다.
  fireEvent.click(favoriteBtn);
  await screen.findByText(currentFavoriteCount);
});
