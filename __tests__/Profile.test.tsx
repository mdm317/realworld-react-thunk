import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import { renderDefault } from "./util";
import Profile from "../src/Pages/Profile";
import { Route } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { profileFakeResponse, userFakeResponse } from "./ApiResponse/user";
import { url } from "../src/db";
import { loginSucAction } from "../src/Redux/User/action";
import {
  articlesFakeResponse,
  articlesOffsetFakeResponse,
} from "./ApiResponse/article";
import { storeToken } from "../src/Jwt/jwt";
const server = setupServer();
server.listen();

const profile = profileFakeResponse.profile;
server.use(
  rest.get(url + `/profiles/:username`, (req, res, ctx) => {
    const { username } = req.params;
    return res(ctx.json(profileFakeResponse));
  }),
  rest.post(url + `/profiles/:username/follow`, (req, res, ctx) => {
    // console.log("follow api");
    // const { username } = req.params;
    const tokenStr = (req.headers as any).map?.authorization;
    //로그인 안되있으면 403
    if (!tokenStr) {
      return res(ctx.status(403));
    }
    const newUser = { ...profileFakeResponse.profile };
    newUser.following = true;
    return res(ctx.json({ profile: newUser }));
  }),
  rest.delete(url + `/profiles/:username/follow`, (req, res, ctx) => {
    // console.log("unfollow api");

    const { username } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    //로그인 안되있으면 403

    if (!tokenStr) {
      return res(ctx.status(403));
    }
    const newUser = { ...profileFakeResponse.profile };
    newUser.following = false;
    return res(ctx.json({ profile: newUser }));
  }),
  rest.get(url + `/articles`, (req, res, ctx) => {
    const favorited = req.url.searchParams.get("favorited");
    if (favorited) {
      return res(ctx.json(articlesOffsetFakeResponse));
    }
    return res(ctx.json(articlesFakeResponse));
  })
);

test("프로필 페이지에 이름 bio image follow 버튼이 보여야한다.", async () => {
  const { history } = renderDefault(
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

  //비로그인시에는 follow 버튼이 보이지 않는다.
  expect(screen.queryByText("follow")).toBeNull();
});

test("프로필 페이지에 그 유저가 쓴 글이 보여져야 한다..", async () => {
  const { history } = renderDefault(
    <Route path="/profile/:username" component={Profile} />
  );
  history.push("/profile/" + profile.username);

  //btn 을 안누르면 랜더링 안되는 이유는???ㄴ
  //npm start 에서는 정상 동작
  // const favoriteBtn = await screen.findByText(/user articles/i);
  // fireEvent.click(favoriteBtn);

  // await screen.findByText(/loading/i);
  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

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

test("프로필 페이지에 그 유저가 좋아하는 글이 보여져야 한다..", async () => {
  const { history } = renderDefault(
    <Route path="/profile/:username" component={Profile} />
  );
  history.push("/profile/" + profile.username);

  const favoriteBtn = await screen.findByText(/favorite/i);
  fireEvent.click(favoriteBtn);

  await screen.findByText(/loading/i);

  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

  // //   articlepreview 가 5개 있어야된다
  const articleListElemList = within(list).getAllByRole("listitem");

  //tag list 를 걸러준다 다른 방법은?
  const articleListElems = articleListElemList.filter(
    (elem) => elem.tagName !== "SPAN"
  );
  expect(articleListElems.length).toBe(5);

  //좋아요가 눌러진된 articleList 값
  const articleList = articlesOffsetFakeResponse.articles;
  //각 articlepreview 는 제목과 내용이 화면에 있어야한다.
  articleListElems.forEach((articleElem, i) => {
    const articleElemWithin = within(articleElem);
    expect(articleElemWithin.getByText(articleList[i].title)).toBeVisible();
    expect(
      articleElemWithin.getByText(articleList[i].description)
    ).toBeVisible();
  });
});

test("follow test", async () => {
  const { store, history } = renderDefault(
    <Route path="/profile/:username" component={Profile} />
  );
  history.push("/profile/" + profile.username);
  //login
  store.dispatch(loginSucAction(userFakeResponse.user));
  storeToken("THISISTOKEN");
  //follow 동작 테스트
  await screen.findByRole("button", { name: /follow/i });
  const followBtn = screen.getByText(/follow/i);
  fireEvent.click(followBtn);

  expect(await screen.findByRole("alert")).toHaveTextContent(/follow success/i);
  screen.getByText(/unfollow/i);
  // //un follow 동작 테스트
  fireEvent.click(followBtn);

  expect(await screen.findByText(/unfollow success/i));
  expect(followBtn).toHaveTextContent(/follow/i);
});
