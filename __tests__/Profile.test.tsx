import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import { renderDefault } from "./util";
import Profile from "../src/Pages/Profile";
import { Route, Router } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { profileFakeResponse, userFakeResponse } from "./ApiResponse/user";
import { url } from "../src/db";
import { loginSucAction } from "../src/Redux/User/action";
import {
  articleFakeResponse,
  articlesFakeResponse,
} from "./ApiResponse/article";
import { debug } from "webpack";
const server = setupServer();
server.listen();

const profile = profileFakeResponse.profile;
server.use(
  rest.get(url + `/profiles/${profile.username}`, (req, res, ctx) => {
    return res(ctx.json(profileFakeResponse));
  }),
  rest.post(url + `/profiles/:username/follow`, (req, res, ctx) => {
    const { username } = req.params;

    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(userFakeResponse));
  }),
  rest.delete(url + `/profiles/:username/follow`, (req, res, ctx) => {
    const { username } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(userFakeResponse));
  }),

  rest.get(url + `/articles`, (req, res, ctx) => {
    return res(ctx.json(articlesFakeResponse));
  })
);

test("프로필 페이지에 이름 bio image follow 버튼이 보여야한다.", async () => {
  const { history, store } = renderDefault(
    <Route path="/profile/:username" component={Profile} />
  );
  history.push("/profile/" + profile.username);

  await screen.findByText(profile.username);
  screen.getByText(profile.bio);
  //다른 방법이 있나?
  const displayedImage = document.querySelector(
    "img.user-img"
  ) as HTMLImageElement;
  expect(displayedImage.src).toBe(profile.image);

  expect(screen.queryByText("follow")).toBeNull();

  //login
  store.dispatch(loginSucAction(userFakeResponse.user));

  //follow 동작 테스트
  const followBtn = screen.getByText(/follow/i);
  fireEvent.click(followBtn);

  expect(await screen.findByRole("alert")).toHaveTextContent(/success/i);
  screen.getByText(/unfollow/i);
});

test("프로필 페이지에 그 유저가 쓴 글이 보여져야 한다..", async () => {
  const { history, store, debug } = renderDefault(
    <Route path="/profile/:username" component={Profile} />
  );
  history.push("/profile/" + profile.username);

  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });
  //   debug();
  //   articlepreview 가 5개 있어야된다
  const articleListElemList = within(list).getAllByRole("listitem");

  //tag list 를 걸러준다 다른 방법은?
  const articleListElems = articleListElemList.filter(
    (elem) => elem.tagName !== "SPAN"
  );
  expect(articleListElems.length).toBe(5);

  //반환된 articleList 값
  const articleList = articlesFakeResponse.articles;
  //각 articlepreview 는 제목과 내용이 화면에 있어야한다.
  articleListElems.forEach((articleElem, i) => {
    const articleElemWithin = within(articleElem);
    expect(articleElemWithin.getByText(articleList[i].title)).toBeVisible();
    expect(
      articleElemWithin.getByText(articleList[i].description)
    ).toBeVisible();
  });
});
