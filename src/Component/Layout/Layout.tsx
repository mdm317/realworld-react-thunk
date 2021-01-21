import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../Jwt/jwt";
import { getCurrentUserThunk } from "../../Thunk/user";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProp {
  children: JSX.Element | JSX.Element[];
}
export default function Layout({ children }: LayoutProp): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getToken();

    if (token) {
      dispatch(getCurrentUserThunk(token));
    }
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
