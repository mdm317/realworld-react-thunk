import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../Redux";
import { logoutThunk } from "../../Thunk/user";
import baseUrl from "../../baseurl";

export default function Header(): JSX.Element {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const dispatch = useDispatch();
  const clickLogOut = () => {
    dispatch(logoutThunk());
    toast.info("log out success");
  };
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={`${baseUrl}/`} className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink
              exact
              activeClassName="active"
              to={`${baseUrl}/`}
              className="nav-link"
            >
              Home
            </NavLink>
          </li>
          {isLogin && (
            <>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to={`${baseUrl}/addPost`}
                  className="nav-link"
                >
                  New Post
                </NavLink>
              </li>{" "}
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to={`${baseUrl}/setting`}
                  className="nav-link"
                >
                  Settings
                </NavLink>
              </li>
            </>
          )}

          {isLogin ? (
            <li className="nav-item">
              <Link
                onClick={clickLogOut}
                to={`${baseUrl}/`}
                className="nav-link"
              >
                Log out
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to={`${baseUrl}/signup`}
                  className="nav-link"
                >
                  Sign up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  to={`${baseUrl}/login`}
                  className="nav-link"
                >
                  Log in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
