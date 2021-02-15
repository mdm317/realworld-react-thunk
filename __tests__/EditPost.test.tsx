import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import SettingPost from "../src/Pages/SettingPost";
import makeStore from "../src/Redux";
import "@testing-library/jest-dom";
import { loginSucAction } from "../src/Redux/User/action";
import { createBrowserHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../src/db";
import { destroyToken, storeToken } from "../src/Jwt/jwt";
import { checkToken, renderDefault } from "./util";
import { articleFakeResponse } from "./ApiResponse/article";
import { userFakeResponse } from "./ApiResponse/user";
import { Route } from "react-router-dom";
import { LOGIN_FAILURE } from "../src/Redux/User/types";

const server = setupServer();
const TOKEN = "THISISTOKEN";

const newTitle = "new title";
const newDes = "new desciption";
const newBody = "#new body";
const newTag = "new tag";
server.listen();
server.use(
  rest.get(url + "/articles/:slug", (req, res, ctx) => {
    const { slug } = req.params;

    return res(ctx.json(articleFakeResponse));
  }),
  rest.put(url + "/articles/:slug", (req, res, ctx) => {
    const { article } = req.body as any;
    const { slug } = req.params;
    console.log("article", article);

    if (newTitle !== article.title) {
      return res(ctx.status(500));
    }
    if (newDes !== article.description) {
      return res(ctx.status(500));
    }
    if (newBody !== article.body) {
      return res(ctx.status(500));
    }
    if (article.tagList.indexOf(newTag) === -1) {
      return res(ctx.status(500));
    }

    if (!checkToken(req, TOKEN)) {
      return res(ctx.status(403));
    }
    return res(ctx.json(articleFakeResponse));
  })
);
test("글 수정", async () => {
  const beforeArticle = articleFakeResponse.article;
  const { history, container } = renderDefault(
    <Route path={`/article/edit/:slug`} component={SettingPost} />
  );
  history.push(`/article/edit/${beforeArticle.slug}`);
  //로그인
  storeToken(TOKEN);
  //태그들이 있어야한다
  for (const tag of beforeArticle.tagList) {
    await screen.findByText(tag);
  }
  //제목이 있어햔다.
  const titleInput = screen.getByDisplayValue(beforeArticle.title); // input value로 찾기

  //설명이 있어야하고
  const desInput = screen.getByDisplayValue(beforeArticle.description);

  // id가 body인 textarea 의 내용이 body와 같아야한다.
  const body = container.querySelector("#body") as HTMLInputElement;
  // screen.getByText(beforeArticle.body); error 왜???
  expect(body.value).toEqual(beforeArticle.body);

  fireEvent.change(titleInput, {
    target: { value: newTitle },
  });
  fireEvent.change(desInput, {
    target: { value: newDes },
  });
  fireEvent.change(body, {
    target: { value: newBody },
  });
  //태그 추가
  const tagInput = screen.getByPlaceholderText(/Enter tags/i);

  fireEvent.change(tagInput, { target: { value: newTag } });
  fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });

  //폼 제출
  const submitBtn = screen.getByRole("button", { name: /Publish Article/i });
  fireEvent.click(submitBtn);

  //성공 메시지 확인
  expect(await screen.findByRole("alert")).toHaveTextContent(
    /edit article success/i
  );
});
test("잘못된 로그인값일시 에러메시지 나태남", async () => {
  const beforeArticle = articleFakeResponse.article;
  const { history, container } = renderDefault(
    <Route path={`/article/edit/:slug`} component={SettingPost} />
  );
  history.push(`/article/edit/${beforeArticle.slug}`);
  //잘못된 토큰
  storeToken("WHRONG TOKEN");
  //태그들이 있어야한다
  for (const tag of beforeArticle.tagList) {
    await screen.findByText(tag);
  }
  //제목이 있어햔다.
  const titleInput = screen.getByDisplayValue(beforeArticle.title); // input value로 찾기

  //설명이 있어야하고
  const desInput = screen.getByDisplayValue(beforeArticle.description);

  // id가 body인 textarea 의 내용이 body와 같아야한다.
  const body = container.querySelector("#body") as HTMLInputElement;
  // screen.getByText(beforeArticle.body); error 왜???
  expect(body.value).toEqual(beforeArticle.body);

  fireEvent.change(titleInput, {
    target: { value: newTitle },
  });
  fireEvent.change(desInput, {
    target: { value: newDes },
  });
  fireEvent.change(body, {
    target: { value: newBody },
  });
  //태그 추가
  const tagInput = screen.getByPlaceholderText(/Enter tags/i);

  fireEvent.change(tagInput, { target: { value: newTag } });
  fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });

  //폼 제출
  const submitBtn = screen.getByRole("button", { name: /Publish Article/i });
  fireEvent.click(submitBtn);

  //성공 메시지 확인
  expect(await screen.findByRole("alert")).toHaveTextContent(/try it rater/i);
});
