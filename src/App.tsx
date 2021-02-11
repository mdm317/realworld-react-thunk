import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  BrowserRouter,
  Switch,
  Link,
  useHistory,
  Router,
  Redirect,
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
import Profile from "./Pages/Profile";
import baseUrl from "./baseurl";
export default function App(): JSX.Element {
  console.log("root history", history);

  return (
    <>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route path={`${baseUrl}/login`} component={Login} />
            <Route path={`${baseUrl}/setting`} component={SettingUser} />
            <Route path={`${baseUrl}/signup`} component={SignUp} />
            <Route path={`${baseUrl}/addPost`} component={SettingPost} />
            <Route
              path={`${baseUrl}/article/edit/:slug`}
              component={SettingPost}
            />
            <Route
              path={`${baseUrl}/article/:slug`}
              component={ArticleDetail}
            />
            <Route path={`${baseUrl}/profile/:username`} component={Profile} />
            <Route exact path={`${baseUrl}/`} component={Home} />
            <Redirect path="*" to={`${baseUrl}/`} />
          </Switch>
        </Layout>
      </Router>
      <ToastContainer />
    </>
  );
}
