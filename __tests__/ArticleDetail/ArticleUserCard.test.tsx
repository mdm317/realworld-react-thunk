import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
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
  })
);
server.use(
  rest.post(url + `/profiles/:username/follow`, (req, res, ctx) => {
    const { username } = req.params;
    console.log("follow", username);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(userFakeResponse));
  })
);
server.use(
  rest.delete(url + `/profiles/:username/follow`, (req, res, ctx) => {
    const { username } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(userFakeResponse));
  })
);

server.use(
  rest.post(url + `/articles/:slug/favorite`, (req, res, ctx) => {
    const { slug } = req.params;
    console.log("fa");
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    const toggleFavoriteArticle: Article = {
      ...articleFakeResponse.article,
      favorited: !articleFakeResponse.article.favorited,
    };
    return res(ctx.json({ article: toggleFavoriteArticle }));
  }),
  rest.delete(url + `/articles/:slug/favorite`, (req, res, ctx) => {
    console.log("unfa");

    const { slug } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(articleFakeResponse));
  })
);

test("follow 를 누르면 follow 를 해야한다. ", async () => {
  //favorite 와 follow는 모두 안해있는 상태
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  store.dispatch(loginSucAction(userFakeResponse.user));

  //test id 로 컴포넌트 찾는다 다른 방법은?? ㅠ
  const articleUserCards = await screen.findAllByTestId("articleUserCard");
  //2개여야 하고
  expect(articleUserCards).toHaveLength(2);
  //첫번쨰 컴포넌트로만 검사한다.
  const articleUserCard = within(articleUserCards[0]);

  //unfollow 버튼이 아닌
  expect(articleUserCard.queryByText(/unfollow/i)).toBeNull();
  //follow 버튼과 favorite 버튼이 있어야 하고
  const followBtn = articleUserCard.getByText(/follow/i);

  //un favoirte 가 아닌 favorite 가 있어야 한다.
  articleUserCard.getByText(/favorite/i);
  expect(articleUserCard.queryByText(/unfavorite/i)).toBeNull();

  //   //edit 버튼과 delete 버튼은 없어야 한다.
  expect(articleUserCard.queryByText(/edit/i)).toBeNull();
  expect(articleUserCard.queryByText(/delete/i)).toBeNull();

  //  follow 버튼을 누르면 unfollow 버튼이 나와야 한다.
  fireEvent.click(followBtn);
  await articleUserCard.findAllByText(/unfollow/i);
  expect(followBtn.className).toContain("active");
  //unfollow 버튼이 아닌

  //  unfollow 버튼을 누르면 follow 버튼이 나와야 한다.
  fireEvent.click(followBtn);
  await articleUserCard.findByText(/\sfollow/i);
});

test("favoirte 를 누르면 favorite 를 해야한다. ", async () => {
  //favorite 와 follow는 모두 안해있는 상태
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  store.dispatch(loginSucAction(userFakeResponse.user));

  //test id 로 컴포넌트 찾는다 다른 방법은?? ㅠ
  const articleUserCards = await screen.findAllByTestId("articleUserCard");
  //2개여야 하고
  expect(articleUserCards).toHaveLength(2);
  //첫번쨰 컴포넌트로만 검사한다.
  const articleUserCard = within(articleUserCards[0]);

  //unfavorite 가 아닌 favorite 버튼이 잉ㅆ어야 한다.
  const favoriteBtn = articleUserCard.getByText(/\sfavorite/i);

  //  favorite 버튼을 누르면 unfavorite 버튼이 나와야 한다.
  fireEvent.click(favoriteBtn);
  await articleUserCard.findByText(/unfavorite/i);
  //active 가 포함되어야 한다.
  expect(favoriteBtn.classList).toContain("active");

  fireEvent.click(favoriteBtn);
  await articleUserCard.findByText(/\sfavorite/i);
  expect(favoriteBtn.classList).not.toContain("active");
});
