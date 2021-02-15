import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";

import "@testing-library/jest-dom";
import Home from "../../src/Pages/Home";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../../src/db";

import {
  articleListLimit5Response,
  articlesFakeResponse,
} from "../ApiResponse/article";
import { renderDefault } from "../util";
const pagePerPagenation = 5;
const server = setupServer();

beforeAll(() => {
  server.listen();
  server.use(
    rest.get(url + `/articles`, (req, res, ctx) => {
      const limit = req.url.searchParams.get("limit");
      //limit 가 5 가 아니면 아무데이터도 안줌
      if (Number(limit) !== pagePerPagenation) {
        return res(ctx.status(200));
      }
      return res(ctx.json(articleListLimit5Response));
    })
  );
});
afterAll(() => server.close());

test("처음에는 5개의 article preview 가 화면에표시되어야한다.", async () => {
  const articleList = articleListLimit5Response.articles;

  renderDefault(<Home />);

  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

  const listElems = within(list).getAllByRole("listitem");
  //tag list 도 포함되 있으므로 tag list 를 제거한다.
  const articleListElems = listElems.filter(
    (elem) => !elem.className.includes("tag")
  );
  //articlepreview 가 5개 있어야된다
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
  renderDefault(<Home />);

  server.use(
    rest.get(
      url + `/articles?offset=30&limit=${pagePerPagenation}&`,
      (req, res, ctx) => {
        return res(ctx.json(articlesFakeResponse));
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

  //페이지 갱신 시 is loading 이라는 문구 를 표시한다.
  expect(await screen.findByText(/Is Loading.../i)).toBeVisible();
  //page 7 에 있는 article list 를 불러와야 한다.
  const list = await screen.findByRole("list", {
    name: /Article list/i,
  });

  //articlepreview 가 5개 있어야된다
  const listElems = within(list).getAllByRole("listitem");
  const articleListElems = listElems.filter(
    (elem) => !elem.className.includes("tag")
  );

  expect(articleListElems.length).toBe(5);

  const articleList = articlesFakeResponse.articles;
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
