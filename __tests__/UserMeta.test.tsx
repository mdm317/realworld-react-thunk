import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { loginSucAction } from "../src/Redux/User/action";
import { userFakeResponse } from "./ApiResponse/user";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../src/db";
import { checkToken, renderDefault } from "./util";
import UserMeta from "../src/Component/UserMeta";
import { articleFakeResponse } from "./ApiResponse/article";
import { storeToken } from "../src/Jwt/jwt";
const server = setupServer();

const article = articleFakeResponse.article;
const TOKEN = "THISISTOKEN";
beforeAll(() => {
  server.listen();
  server.use(
    rest.post(url + "/articles/:slug/favorite", (req, res, ctx) => {
      if (checkToken(req, TOKEN)) {
        return res(ctx.json(article));
      }
      return res(ctx.status(403));
    }),
    rest.delete(url + "/articles/:slug/favorite", (req, res, ctx) => {
      if (checkToken(req, TOKEN)) {
        return res(ctx.json(article));
      }
      return res(ctx.status(403));
    })
  );
});

afterAll(() => server.close());

test(`로그인 전에는 
you need to login 이라는 알람창이 뜨게 한다. `, async () => {
  const { store } = renderDefault(<UserMeta article={article} />);
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
  store.dispatch(loginSucAction(userFakeResponse.user));
  storeToken(TOKEN);

  const favoriteBtn = screen.getByRole("button");

  //favorite 버튼을 누르면 favorite 카운트가 늘어난다.
  fireEvent.click(favoriteBtn);
  await screen.findByText(currentFavoriteCount + 1);

  //이미 favorite 된 상태면 favorite 카운트가 다시 줄어든다.
  fireEvent.click(favoriteBtn);
  await screen.findByText(currentFavoriteCount);
});
test("토큰을 잘못보내면 에러메시지를 띠운다", async () => {
  const { store } = renderDefault(<UserMeta article={article} />);

  store.dispatch(loginSucAction(userFakeResponse.user));
  storeToken("WRONG TOKEN");

  const favoriteBtn = screen.getByRole("button");
  fireEvent.click(favoriteBtn);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/you need to login/i);
});
