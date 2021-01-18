import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import Pagenation from "../src/Component/Pagenation";
import { Provider } from "react-redux";
import makeStore from "../src/Redux";
import { storeToken } from "../src/Jwt/jwt";
import { getArticleList } from "../src/Thunk/article";
import { getArticleListSuccessAction } from "../src/Redux/Article/action";
import { createMemoryHistory } from "history";
import { articlesFakeResponse } from "./ApiResponse/article";
import { ThunkDispatch } from "redux-thunk";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../src/db";
import { Router } from "react-router-dom";
import { debug } from "webpack";
import { ToastContainer } from "react-toastify";

const pagePerPagenation = 5;

function renderDefault(component: JSX.Element, store: any, history: any) {
  return render(
    <Provider store={store}>
      <Router history={history}>{component}</Router>
      <ToastContainer />
    </Provider>
  );
}

test(`40개 의 article 이 있을시 pagenation은
전 page목록 다음 page 목록 버튼 2개와 page 8개 총 10개 있어야된다`, async () => {
  const store = makeStore();
  const history = createMemoryHistory();
  renderDefault(<Pagenation pagePerPagenation={5} />, store, history);

  //article 들을 불러옴
  (store.dispatch as any)(
    getArticleListSuccessAction({
      articleList: articlesFakeResponse.articles,
      articlesCount: 40,
    })
  );
  //article count 를 받아서 업데이트 될때까지 기다림
  await screen.findByText("7");

  //pagenation ul 을찾음
  const list = screen.getByRole("list", {
    name: /pagenation/i,
  });

  // //pagenation은 전 page목록 다음 page 목록 버튼 2개와 page 8개 총 10개 있어야된다
  const pagenationElems = within(list).getAllByRole("listitem");

  expect(pagenationElems.length).toBe(10);
});
test(`41개의 article 이 있을시 페이지네이션 개수는 11개여야하고  `, async () => {
  const store = makeStore();
  const history = createMemoryHistory();

  renderDefault(<Pagenation pagePerPagenation={5} />, store, history);

  //article 들을 불러옴
  (store.dispatch as any)(
    getArticleListSuccessAction({
      articleList: articlesFakeResponse.articles,
      articlesCount: 41,
    })
  );
  //article count 를 받아서 업데이트 될때까지 기다림
  await screen.findByText("7");

  //pagenation ul 을찾음
  const list = screen.getByRole("list", {
    name: /pagenation/i,
  });

  // //pagenation은 전 page목록 다음 page 목록 버튼 2개와 page 9개 총 11개 있어야된다
  const pagenationElems = within(list).getAllByRole("listitem");

  expect(pagenationElems.length).toBe(11);

  //article 120개 일때
  (store.dispatch as any)(
    getArticleListSuccessAction({
      articleList: articlesFakeResponse.articles,
      articlesCount: 120,
    })
  );
  await screen.findByText("7");

  //pagenation ul 을찾음
  const list2 = screen.getByRole("list", {
    name: /pagenation/i,
  });

  // //pagenation은 전 page목록 다음 page 목록 버튼 2개와 page 10개 총 12개 있어야된다
  const pagenationElems2 = within(list2).getAllByRole("listitem");

  expect(pagenationElems2.length).toBe(12);
});
test(`◀ 버튼 누를시 전 페이지네이션 없으면 에러메시지 나태냄
▶버튼 누를시 다음 페이지네이션 없으면 에러메시지 나태냄`, async () => {
  const store = makeStore();
  const history = createMemoryHistory();

  renderDefault(<Pagenation pagePerPagenation={5} />, store, history);

  //article 들을 불러옴
  (store.dispatch as any)(
    getArticleListSuccessAction({
      articleList: articlesFakeResponse.articles,
      articlesCount: 40,
    })
  );
  //article count 를 받아서 업데이트 될때까지 기다림
  await screen.findByText("7");

  //◀ 버튼을 누를시
  //전의 page 목록이 존재하지 않을때는 toast 로 전 페이지 없음을 알려준다.

  fireEvent.click(screen.getByText("◀"));
  expect(await screen.findByText(/이전 페이지가 없습니다./i)).toBeVisible();

  //마지막 li 안에 있는 a태그를 눌러서
  // 있는 다음 페이지목록 버튼을 누를시
  //다음의 page 목록이 존재하지 않을때는 toast 로 전 페이지 없음을 알려준다.

  fireEvent.click(screen.getByText("▶"));

  expect(await screen.findByText(/다음 페이지가 없습니다./i)).toBeVisible();
});

test(`◀ 버튼 누를시 전 페이지네이션 있을시 전 페이지네이션 나타냄
▶버튼 누를시 다음 페이지네이션 있을시 후 페이지네이션 나타냄`, async () => {
  const store = makeStore();
  const history = createMemoryHistory();

  renderDefault(<Pagenation pagePerPagenation={5} />, store, history);

  //article 들을 불러옴
  (store.dispatch as any)(
    getArticleListSuccessAction({
      articleList: articlesFakeResponse.articles,
      articlesCount: 500,
    })
  );
  //article count 를 받아서 업데이트 될때까지 기다림
  await screen.findByText("7");

  //pagenation ul 을찾음
  const list = screen.getByRole("list", {
    name: /pagenation/i,
  });

  // //pagenation은 전 page목록 다음 page 목록 버튼 2개와 page 10개 총 10개 있어야된다
  const pagenationElems = within(list).getAllByRole("listitem");

  expect(pagenationElems.length).toBe(12);

  // 처음엔 1부터 10까지 페이지 목록이 있어야 한다.
  for (let i = 1; i <= 10; ++i) {
    expect(within(list).getByText(i.toString())).toBeVisible();
  }

  // 다음 페이지 목록 버튼을 누르면 11~20 페이지 목록이 바뀐다.
  const nxtBtn = screen.getByText("▶");
  fireEvent.click(nxtBtn);
  for (let i = 11; i <= 20; ++i) {
    expect(within(list).getByText(i.toString())).toBeVisible();
  }

  // 이전 페이지 목록 버튼을 누르면 1~10 페이지 목록으로 돌아온다 .
  const preBtn = screen.getByText("◀");
  fireEvent.click(preBtn);
  for (let i = 1; i <= 10; ++i) {
    expect(within(list).getByText(i.toString())).toBeVisible();
  }
});
