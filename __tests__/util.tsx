import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import makeStore from "../src/Redux";
import { createMemoryHistory, createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

export const renderDefault = (children: JSX.Element) => {
  const history = createBrowserHistory();
  const store = makeStore();
  const rendered = render(
    <Provider store={store}>
      <Router history={history}>{children}</Router>
      <ToastContainer />
    </Provider>
  );
  return { history, store, ...rendered };
};
export const checkToken = (req: any, TOKEN: any) => {
  const tokenStr = (req.headers as any).map?.authorization;
  //로그인 안되있으면 403
  if (TOKEN) {
    //Token $tokenname 이런식으로 header 에 있는지 검사
    const tokentitle = tokenStr.slice(0, 5);
    const tokenname = tokenStr.slice(6, 6 + TOKEN.length);
    if (tokentitle !== "Token") {
      return false;
    }
    if (tokenname !== TOKEN) {
      return false;
    }
  }
  if (!tokenStr) {
    return false;
  }
  return true;
};
