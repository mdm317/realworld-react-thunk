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
