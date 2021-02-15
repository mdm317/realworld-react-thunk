import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";

import "@testing-library/jest-dom";
import Home from "../../src/Pages/Home";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../../src/db";

import {
  articlesOffsetFakeResponse,
  articlesFakeResponse,
} from "../ApiResponse/article";
import { loginSucAction } from "../../src/Redux/User/action";
import { getToken } from "../../src/Jwt/jwt";
import { renderDefault } from "../util";
import { userFakeResponse } from "../ApiResponse/user";
const pagePerPagenation = 5;
const server = setupServer();
const user = userFakeResponse.user;
const userArticleList = articlesFakeResponse.articles.map((article) => {
  const newArticle = { ...article };
  newArticle.author.username = user.username;
  return newArticle;
});
const userArticleListResponse = {
  articles: userArticleList,
  articlesCount: 500,
};
const offsetArticleList = articlesOffsetFakeResponse.articles;
const globalArticleList = articlesFakeResponse.articles;
beforeAll(() => {
  server.listen();
  server.use(
    rest.get(url + `/articles`, (req, res, ctx) => {
      // console.log(req.url.toString());

      const limit = req.url.searchParams.get("limit");
      const author = req.url.searchParams.get("author");
      const offset = req.url.searchParams.get("offset");

      if (!limit) {
        //user feed test 니까 유저 정보가 없으면 아무내용도 주지않느다.
        //limit 가 없으면 아무내용도 주지않느다.
        return res(ctx.status(200));
      }
      if (!author) {
        //global articles
        return res(ctx.json(articlesFakeResponse));
      }
      if (offset === "30") {
        //7번 페이지를 눌렀을때 보냄
        //user feed 페이지네이션 테스트를 위한 응답
        return res(ctx.json(articlesOffsetFakeResponse));
      }
      //limit 만 있을때의 속성
      return res(ctx.json(userArticleListResponse));
    })
  );
});
afterAll(() => server.close());

test(`home 에서 my feed 버튼을 누르면 내가 쓴글들의
article preview 가 화면에표시되어야한다.`, async () => {
  const { store, history } = renderDefault(<Home />);

  //login 전에 my feed 버튼을 누르면 아무변화가 없음
  const myFeedDiv = screen.getByText(/My Feed/);
  expect(myFeedDiv.tagName).toEqual("DIV");
  fireEvent.click(screen.getByText(/My Feed/));
  expect(history.location.pathname).toEqual("/");

  //login 이 성공했다고 가정
  store.dispatch(loginSucAction(user));

  //my feed 버튼 클릭
  const myFeedLink = await screen.findByRole("button", { name: /My Feed/i });
  fireEvent.click(myFeedLink);

  //loading
  expect(await screen.findByText(/Is Loading.../i)).toBeVisible();

  //list 가 화면에 표시되길 기다린다.
  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

  //list 를 찾음
  const listElems = within(list).getAllByRole("listitem");
  //tag list 도 포함되 있으므로 tag list 를 제거한다.
  const articleListElems = listElems.filter(
    (elem) => !elem.className.includes("tag")
  );
  //articlepreview 가 5(pagePerPagenation)개 있어야된다
  expect(articleListElems.length).toBe(pagePerPagenation);

  //각 articlepreview 는 제목과 내용이 화면에 있어야한다.
  articleListElems.forEach((articleElem, i) => {
    const articleElemWithin = within(articleElem);
    expect(articleElemWithin.getByText(userArticleList[i].title)).toBeVisible();
    expect(
      articleElemWithin.getByText(userArticleList[i].description)
    ).toBeVisible();
  });

  //global link 클릭
  const globalLink = screen.getByRole("button", {
    name: /global Feed/i,
  });
  fireEvent.click(globalLink);

  //loading
  expect(await screen.findByText(/Is Loading.../i)).toBeVisible();

  //list 가 화면에 표시되길 기다린다.
  const listGlobal = await screen.findByRole("list", {
    name: /Article list/i,
  });

  const listGlobalElems = within(listGlobal).getAllByRole("listitem");
  //tag list 도 포함되 있으므로 tag list 를 제거한다.
  const articleGlobalListElems = listGlobalElems.filter(
    (elem) => !elem.className.includes("tag")
  );
  //articlepreview 가 5(pagePerPagenation)개 있어야된다
  expect(articleGlobalListElems.length).toBe(pagePerPagenation);

  //각 articlepreview 는 제목과 내용이 화면에 있어야한다.
  // 글로벌 피드를 누르고 나온 결과는 globalAritle 과 같아야 한다.
  articleGlobalListElems.forEach((articleElem, i) => {
    const articleElemWithin = within(articleElem);
    expect(
      articleElemWithin.getByText(globalArticleList[i].title)
    ).toBeVisible();
    expect(
      articleElemWithin.getByText(globalArticleList[i].description)
    ).toBeVisible();
  });
});
test(`pagenation page 를 누르면 내가 쓴 글들의
  다른 페이지의 내용을 표시해야 한다.`, async () => {
  const { store, history } = renderDefault(<Home />);

  //login 이 성공했다고 가정
  store.dispatch(loginSucAction(user));

  //my feed 버튼을 누른다
  const myFeedLink = await screen.findByRole("button", { name: /My Feed/i });
  fireEvent.click(myFeedLink);
  console.log(history);

  expect(await screen.findByText(/Is Loading.../i)).toBeVisible();

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

  //페이지 갱신시 is loading 이라는 문구 를 표시한다.
  expect(await screen.findByText(/Is Loading.../i)).toBeVisible();

  //page 7 에 있는 article list 를 불러와야 한다.
  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

  //articlepreview 가 5(pagePerPagenation)개 있어야된다
  const listElems = within(list).getAllByRole("listitem");
  //tag list 도 포함되 있으므로 tag list 를 제거한다.
  const articleListElems = listElems.filter(
    (elem) => !elem.className.includes("tag")
  );
  expect(articleListElems.length).toBe(pagePerPagenation);

  //각 articlepreview 는 제목과 내용이 화면에 있어야한다.
  articleListElems.forEach((articleElem, i) => {
    //preview container 를 한정한다.
    const articleElemWithin = within(articleElem);
    //제목이 화면에 표시되어야한다. 표시되는 글자수는 50으로 제한한다.
    expect(
      articleElemWithin.getByText(offsetArticleList[i].title.slice(0, 50))
    ).toBeVisible();
    //내용이 화면에 표시 되어야 한다.표시되는 글자수는 100으로 제한한다.
    expect(
      articleElemWithin.getByText(
        offsetArticleList[i].description.slice(0, 100)
      )
    ).toBeVisible();
  });
});
