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

import {
  responseArticleListLimit5,
  responseArticleListCounts40,
} from "./api-response";
const pagePerPagenation = 5;
const server = setupServer();

beforeAll(() => {
  server.listen();
});
beforeEach(() => {
  server.use(
    rest.get(url + `/articles?limit=${pagePerPagenation}&`, (req, res, ctx) => {
      return res(ctx.json(responseArticleListLimit5));
    })
  );
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

function wrapWithRouter(component: JSX.Element, history: any) {
  return <Router history={history}>{component}</Router>;
}
function renderWithProvidersAndToast(component: JSX.Element) {
  const store = makeStore();
  return render(
    <Provider store={store}>
      {component}
      <ToastContainer />
    </Provider>
  );
}

test("5개의 article preview 가 화면에표시되어야한다.", async () => {
  const articleList = responseArticleListLimit5.articles;

  const history = createMemoryHistory();
  renderWithProvidersAndToast(wrapWithRouter(<Home />, history));
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
test(`pagenation page 를 누르면 
  다른 페이지의 내용을 표시해야 한다.`, async () => {
  const history = createMemoryHistory();
  renderWithProvidersAndToast(wrapWithRouter(<Home />, history));
  server.use(
    rest.get(
      url + `/articles?offset=30&limit=${pagePerPagenation}&`,
      (req, res, ctx) => {
        return res(ctx.json(responseArticleListLimit5));
      }
    )
  );
  //서버에서 articlelist 를 불러올때까지 대기
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

  const articleList = responseArticleListLimit5.articles;
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
