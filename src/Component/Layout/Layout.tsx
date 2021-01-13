import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProp {
  children: JSX.Element | JSX.Element[];
}
export default function Layout({ children }: LayoutProp): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
