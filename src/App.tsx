import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  BrowserRouter,
  Switch,
  Link,
  useHistory,
  Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import SettingPost from "./Pages/SettingPost";
import Layout from "./Component/Layout/Layout";
import ArticleDetail from "./Pages/ArticleDetail";
import history from "./history";
import SettingUser from "./Pages/SettingUser";
export default function App(): JSX.Element {
  return (
    <>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/setting" component={SettingUser} />
            <Route path="/signup" component={SignUp} />
            <Route path="/addPost" component={SettingPost} />
            <Route path="/article/edit/:slug" component={SettingPost} />
            <Route path="/article/:slug" component={ArticleDetail} />
            <Route component={() => <h1>NOT FOUND</h1>} />
          </Switch>
        </Layout>
      </Router>
      <ToastContainer />
    </>
  );
}
