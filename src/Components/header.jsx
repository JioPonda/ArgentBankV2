import React from "react";
import argentBankLogo from "../Assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionLogOut } from "../Redux/action";
import { deleteTokenInLocalStorage } from "../Services/localStorageManagement";

function Header() {
  const stateRetrieved = useSelector((state) => state);
  const dispatch = useDispatch();

  /// Log out and token deletion function
  function submissionLogOut() {
    dispatch(actionLogOut());
    deleteTokenInLocalStorage();
  }

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/Home">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="main-nav-container1">
          <Link
            className="main-nav-item"
            to={stateRetrieved.logIn ? "/User" : "/Sign-in"}
          >
            <div className="main-nav-item-logIn">
              <i className="fa fa-user-circle"></i>
              <p className="main-nav-item-textLogIn">
                {stateRetrieved.firstName === null
                  ? " Sign In"
                  : " " + stateRetrieved.firstName}
              </p>
            </div>
          </Link>
          {stateRetrieved.logIn === true &&
          stateRetrieved.firstName !== null &&
          stateRetrieved.lastName !== null ? (
            <Link
              className="main-nav-item2"
              to="/Home"
              onClick={() => submissionLogOut()}
            >
              <div className="main-nav-item-logOut">
                <i className="fa fa-sign-out"></i>
                <p className="main-nav-item-textLogOut">Sign Out</p>
              </div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
