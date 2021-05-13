import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./PagesWithReduxToolkit/HomeTK";
import history from "./history";
import baseUrl from "./baseurl";
import Layout from "./Component/Layout/Layout";
import { useSelector } from "react-redux";
const Test = () => {
  const sdfsd = useSelector((state) => state);
  console.log(sdfsd);
  return <h1>test</h1>;
};
export default function AppToolkit(): JSX.Element {
  console.log("root history", history);
  return (
    <>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path={`${baseUrl}/`} component={Home} />
            <Redirect path="*" to={`${baseUrl}/`} />
          </Switch>
        </Layout>
      </Router>
      <ToastContainer />
    </>
  );
}
