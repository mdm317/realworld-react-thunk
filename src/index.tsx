import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import makeStore from "./Redux/index";

const store = makeStore();
ReactDOM.render(
  <App />,

  document.getElementById("root")
);
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
