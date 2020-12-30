import React from "react";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";

export default function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
