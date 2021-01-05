import React from "react";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";

const h1 = () => {
  return <h1>hello</h1>;
};
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/h" component={h1} />
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </>
  );
}
