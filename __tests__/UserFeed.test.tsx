import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";

import "@testing-library/jest-dom";
import Home from "../src/Pages/Home";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Router } from "react-router-dom";
import makeStore from "../src/Redux";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createMemoryHistory } from "history";
import { url } from "../src/db";
import { History } from "history";

import {
  articlesOffsetFakeResponse,
  articlesFakeResponse,
} from "./ApiResponse/article";
import { loginSucAction } from "../src/Redux/User/action";
import { fakeUserResponse } from "./ApiResponse/user";
import { getToken } from "../src/Jwt/jwt";
const pagePerPagenation = 5;
const server = setupServer();

let history: History;
let store: ReturnType<typeof makeStore>;
let dubug;
beforeAll(() => {
  server.listen();
});
beforeEach(() => {
  server.use(
    rest.get(url + `/articles`, (req, res, ctx) => {
      console.log(req.url.toString());

      const limit = req.url.searchParams.get("limit");
      const author = req.url.searchParams.get("author");
      const offset = req.url.searchParams.get("offset");

      if (!limit || !author) {
        //user feed test 니까 유저 정보가 없으면 아무내용도 주지않느다.
        //limit 가 없으면 아무내용도 주지않느다.
        return res(ctx.status(200));
      }
      if (offset === "30") {
        //user feed 페이지네이션 테스트를 위한 응답
        return res(ctx.json(articlesOffsetFakeResponse));
      }
      //limit 만 있을때의 속성
      return res(ctx.json(articlesFakeResponse));
    })
  );
  history = createMemoryHistory();
  store = makeStore();
  const rendered = render(
    <Provider store={store}>
      <Router history={history}>
        <Home />
      </Router>
      <ToastContainer />
    </Provider>
  );
  dubug = rendered.debug;
});

afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

test(`home 에서 my feed 버튼을 누르면 내가 쓴글들의
 article preview 가 화면에표시되어야한다.`, async () => {
  const articleList = articlesFakeResponse.articles;

  //login 전의 myfeedlink 는 div 로 url을 못바꾸게 한다.
  const myFeedDiv = screen.getByText(/My Feed/);
  expect(myFeedDiv.tagName).toEqual("DIV");
  fireEvent.click(screen.getByText(/My Feed/));

  //login 이 성공했다고 가정
  store.dispatch(loginSucAction(fakeUserResponse.user));
  expect(getToken()).toEqual(fakeUserResponse.user.token);

  //role 로 대체? a 의 role 은?
  const myFeedLink = await screen.findByRole("button", { name: /My Feed/ });
  //   const myFeedLink = await screen.findByText(/My Feed/);
  expect(myFeedLink.tagName).toEqual("A");
  fireEvent.click(screen.getByText(/My Feed/));

  //list 가 화면에 표시되길 기다린다.
  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

  //articlepreview 가 5개 있어야된다
  const articleListElems = within(list).getAllByRole("listitem");
  expect(articleListElems.length).toBe(5);

  //각 articlepreview 는 제목과 내용이 화면에 있어야한다.
  articleListElems.forEach((articleElem, i) => {
    const articleElemWithin = within(articleElem);
    expect(articleElemWithin.getByText(articleList[i].title)).toBeVisible();
    expect(
      articleElemWithin.getByText(articleList[i].description)
    ).toBeVisible();
  });
});
test(`pagenation page 를 누르면 내가 쓴 글들의 
  다른 페이지의 내용을 표시해야 한다.`, async () => {
  //login 이 성공했다고 가정
  store.dispatch(loginSucAction(fakeUserResponse.user));
  expect(getToken()).toEqual(fakeUserResponse.user.token);

  //a 태그가 활성화되고 누를수 있어야한다.
  const myFeedLink = await screen.findByRole("button", { name: /My Feed/ });
  expect(myFeedLink.tagName).toEqual("A");

  //my feed 버튼을 누른다
  fireEvent.click(screen.getByText(/My Feed/));

  //서버에서 articlelist 를 불러올때까지 대기
  // 처음 article list 를 불러와야 페이지 네이션이 활성화되니까
  // article list 가 표시되는것만 확인하고 페이지 네이션을 찾는다.
  await screen.findByRole("list", {
    name: /Article list/i,
  });

  const pagenationlist = screen.getByRole("list", {
    name: /pagenation/i,
  });
  const pagenum = within(pagenationlist).getByText("7");
  fireEvent.click(pagenum);

  //페이지 갱신 저에 is loading 이라는 문구 를 표시한다.
  expect(await screen.findByText(/Is Loading.../)).toBeVisible();

  //page 7 에 있는 article list 를 불러와야 한다.
  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

  //articlepreview 가 5개 있어야된다
  const articleListElems = within(list).getAllByRole("listitem");
  expect(articleListElems.length).toBe(5);

  const articleList = articlesOffsetFakeResponse.articles;
  //각 articlepreview 는 제목과 내용이 화면에 있어야한다.
  articleListElems.forEach((articleElem, i) => {
    //preview container 를 한정한다.
    const articleElemWithin = within(articleElem);
    //제목이 화면에 표시되어야한다. 표시되는 글자수는 50으로 제한한다.
    expect(
      articleElemWithin.getByText(articleList[i].title.slice(0, 50))
    ).toBeVisible();
    //내용이 화면에 표시 되어야 한다.표시되는 글자수는 100으로 제한한다.
    expect(
      articleElemWithin.getByText(articleList[i].description.slice(0, 100))
    ).toBeVisible();
  });
});
