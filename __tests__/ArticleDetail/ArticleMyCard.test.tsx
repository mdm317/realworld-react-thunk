import React from "react";
import {
  findByRole,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderDefault } from "../util";
import { articleFakeResponse } from "../ApiResponse/article";
import ArticleDetail from "../../src/Pages/ArticleDetail";
import { Route } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Article, url } from "../../src/db";
import { userFakeResponse } from "../ApiResponse/user";
import { loginSucAction } from "../../src/Redux/User/action";
import { hasToastId } from "react-toastify/dist/utils";
const server = setupServer();
server.listen();

//follow favorite 버튼 동작
//edit delete 버튼 동작
//==>usercard
const username = "yun";
server.use(
  rest.get(url + `/articles/:slug`, (req, res, ctx) => {
    const { slug } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(articleFakeResponse));
  }),
  rest.delete(url + `/articles/:slug`, (req, res, ctx) => {
    const { slug } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res();
  })
);

test("edit 버튼을 누르면 history 가 /edit/slug 로 변해야 한다.. ", async () => {
  //favorite 와 follow는 모두 안해있는 상태
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  //글 작성자와 같은 이름을 가진 유저로 로그인
  const author = { ...userFakeResponse.user };
  author.username = articleFakeResponse.article.author.username;
  store.dispatch(loginSucAction(author));

  const articleUserCards = await screen.findAllByTestId("articleUserCard");
  const articleMyCard = within(articleUserCards[0]);

  //edit 버튼을 찾는다.
  const editBtn = articleMyCard.getByText(/edit/i);

  fireEvent.click(editBtn);

  // article/edit/slug 로 이동
  expect(history.location.pathname).toEqual(
    `/article/edit/${articleFakeResponse.article.slug}`
  );
});

test("delete 버튼을 누르면 게시물 삭제  ", async () => {
  //favorite 와 follow는 모두 안해있는 상태
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  //글 작성자와 같은 이름을 가진 유저로 로그인
  const author = { ...userFakeResponse.user };
  author.username = articleFakeResponse.article.author.username;
  store.dispatch(loginSucAction(author));

  const articleUserCards = await screen.findAllByTestId("articleUserCard");
  const articleMyCard = within(articleUserCards[0]);

  //edit 버튼을 찾는다.
  const deleteBtn = articleMyCard.getByText(/delete/i);

  fireEvent.click(deleteBtn);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/delete article success/i);

  //홈으로 이동
  expect(history.location.pathname).toEqual("/");
});
