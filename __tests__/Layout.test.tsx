import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import Layout from "../src/Component/Layout/Layout";
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
import { defaultRender } from "./util";
const server = setupServer();

let history: History;
let store: ReturnType<typeof makeStore>;
const TOKEN = "TOKEN";

describe("렌더 될때 token 값으로 유저가 로그인 했는지를 알아본다.", () => {
  beforeAll(() => {
    server.listen();
    server.use(
      rest.get(
        "https://conduit.productionready.io/api/user",
        (req, res, ctx) => {
          //   console.log("req.headers", req.headers);
          const tokenStr = (req.headers as any).map?.authorization;
          // console.log("tokenStr", tokenStr);

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
          // console.log("res send 200");
          return res(ctx.json(fakeUserResponse));
        }
      )
    );
  });
  afterEach(() => {
    server.resetHandlers();
    destroyToken();
  });
  test(` 올바른 token을 주면 
  로그인 상태가 된다.`, async () => {
    storeToken(TOKEN);

    const { store } = defaultRender(
      <Layout>
        <></>
      </Layout>
    );

    //islogin 이 true 가 되는지를 확인한다.
    await waitFor(() => {
      expect(store.getState().user.isLogin).toEqual(true);
    });
  });

  test("잘못된 token 을 주면 islogin 값이 false 여야 한다.", async () => {
    //잘못된 token을 건내준다.
    storeToken("WRONG TOKEN");

    const { store } = defaultRender(
      <Layout>
        <></>
      </Layout>
    );

    // 1초 뒤에 islogin 이 false 인지 확인
    await new Promise((r, s) => {
      setTimeout(() => {
        expect(store.getState().user.isLogin).toEqual(false);
        r(null);
      }, 1000);
    });
  });
});
