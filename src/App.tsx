import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  BrowserRouter,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import SettingPost from "./Pages/SettingPost";
import Layout from "./Component/Layout/Layout";

export default function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/addPost" component={SettingPost} />
            <Route component={() => <h1>NOT FOUND</h1>} />
          </Switch>
        </Layout>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
