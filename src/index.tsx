import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
// import AppToolkit from "./AppToolkit";
import makeStore from "./Redux/index";

const store = makeStore();
// import { store } from "./ReduxToolkit/store";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
