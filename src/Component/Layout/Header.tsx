import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header(): JSX.Element {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a href="/" className="navbar-brand">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              to="/addpost"
              className="nav-link"
            >
              New Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              to="/setting"
              className="nav-link"
            >
              Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/signup" className="nav-link">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
