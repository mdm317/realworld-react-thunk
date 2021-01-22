import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import SettingPost from "../src/Pages/SettingPost";
import makeStore from "../src/Redux";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom";
import { loginSucAction } from "../src/Redux/User/action";
import { fakeUserResponse } from "./ApiResponse/user";
import { History } from "history";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../src/db";
import { destroyToken, storeToken } from "../src/Jwt/jwt";
import { renderDefault } from "./util";
import { articleFakeResponse } from "./ApiResponse/article";

const server = setupServer();
const TOKEN = "TOKEN";

server.listen();
server.use(
  rest.post(url + "/articles", (req, res, ctx) => {
    const { article } = req.body as any;

    if (!article.title) {
      return res(ctx.status(403));
    }
    if (!article.description) {
      return res(ctx.status(403));
    }
    if (!article.body) {
      return res(ctx.status(403));
    }
    //토큰이 정상적으로 오는지 확인
    const tokenStr = (req.headers as any).map?.authorization;

    if (!tokenStr) {
      return res(ctx.status(401));
    }
    const tokentitle = tokenStr.slice(0, 5);
    const tokenname = tokenStr.slice(6, 6 + TOKEN.length);
    if (tokentitle !== "Token") {
      return res(ctx.status(401));
    }
    if (tokenname !== TOKEN) {
      return res(ctx.status(401));
    }

    return res(ctx.json(articleFakeResponse));
  })
);
describe("폼 입력후", () => {
  let history: History;
  let store: ReturnType<typeof makeStore>;
  beforeEach(() => {
    const rendered = renderDefault(<SettingPost />);
    history = rendered.history;
    store = rendered.store;
    fireEvent.change(screen.getByPlaceholderText(/Article Title/i), {
      target: { value: "title" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/What's this article about?/i),
      {
        target: { value: "desciption" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText(/Write your article/i), {
      target: { value: "body" },
    });

    const tagInput = screen.getByPlaceholderText(/Enter tags/i);

    //   //tag1 을 입력 후 엔터 입력
    fireEvent.change(tagInput, { target: { value: "tag1" } });
    fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });

    fireEvent.change(tagInput, { target: { value: "tag2" } });
    fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });

    fireEvent.change(tagInput, { target: { value: "tag3" } });
    fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });
  });
  afterEach(() => {
    destroyToken();
  });
  test("등록될 태그가 보이는것을 확인 중복태그는 등록이 안되는것을 확인", async () => {
    //tag 가 정상적으로 추가됨
    screen.getByText("tag1");
    screen.getByText("tag2");
    screen.getByText("tag3");

    //중복된 태그는 등록 안되는것을 확인
    const tagInput = screen.getByPlaceholderText(/Enter tags/i);
    fireEvent.change(tagInput, { target: { value: "tag3" } });
    fireEvent.keyDown(tagInput, { key: "Enter", code: "Enter" });

    //role 은 await 으로 하고 위의 tag1 을 찾는게 getby 로 되는 이유는?
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /This tag has already been added!/i
    );
  });
  test("로그인후에 제출하면 등록성공이 화면에 표시됨", async () => {
    store.dispatch(loginSucAction(fakeUserResponse.user));
    storeToken(TOKEN);
    const submitBtn = screen.getByRole("button", { name: /Publish Article/i });
    //   console.log(submitBtn.tagName);

    fireEvent.click(submitBtn);
    await screen.findByText(/add post success/i);
  });
  test("토큰 인증에 문제가 있다면 로그인하라는 메시지가 뜸", async () => {
    const submitBtn = screen.getByRole("button", { name: /Publish Article/i });
    //   console.log(submitBtn.tagName);

    fireEvent.click(submitBtn);
    await screen.findByText(/You need to login!/i);
  });
});
