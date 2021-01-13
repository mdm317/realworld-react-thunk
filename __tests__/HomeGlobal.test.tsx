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
test(`pagenation articles 의 개수가 40 개면 
pagenation 의 page num 이  1부터8까지만 표시되야한다.`, async () => {
  const history = createMemoryHistory();
  renderWithProvidersAndToast(wrapWithRouter(<Home />, history));

  //서버에서 articlelist 를 불러올때까지 대기
  await screen.findByRole("list", {
    name: /Article list/i,
  });

  const pagenationlist = screen.getByRole("list", {
    name: /pagenation/i,
  });
  const pagenum = within(pagenationlist).getByText("7");
  console.log(pagenum.innerHTML);
  fireEvent.click(pagenum);

  console.log(history.location);

  // //pagenation ul 을찾음
  // const list = screen.getByRole("list", {
  //   name: /pagenation/i,
  // });

  // //pagenation은 10개 있어야된다
  // const pagenationElems = within(list).getAllByRole("listitem");
  // expect(pagenationElems.length).toBe(10);
  // console.log(pagenationElems[0].innerHTML);

  // //처음 pagenation은 1부터 10까지 있어야한다.
  // // pagenationElems.forEach((elem, i) => {
  // //   if(i==0|| i==9){
  // //   expect(elem.innerHTML).toEqual(◀);
  // //   expect(elem.innerHTML).toEqual(▶);
  // //   }
  // //   expect(elem.innerHTML).toEqual(i);
  // // });
});
