import React, { useEffect } from "react";
import { useState } from "react";
import { getTokenLogin } from "../Services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  actionLogInPass,
  actionLogInFail,
  actionGetUserProfileFail,
  actionGetUserProfile,
} from "../Redux/action";
import { useNavigate } from "react-router-dom";
import { recordOfTokenInLocalStorage } from "../Services/localStorageManagement.js";
import { getUserProfile } from "../Services/apiCalls";

function SignInUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const stateRetrieved = useSelector((state) => state);
  const navigate = useNavigate();

  // Login form submit function
  function submissionSignIn(event) {
    event.preventDefault();
    getTokenLogin(email, password)
      .then((token) => {
        // Successful authentication
        dispatch(actionLogInPass(token)); // Dispatch the action to connect the user
        getUserProfile(token)
          .then((response) => {
            // Successful user profile recovery
            dispatch(actionGetUserProfile(response));
            recordOfTokenInLocalStorage(token, rememberMe);
          })
          .catch((error) => {
            // Failed to retrieve user profile
            dispatch(actionGetUserProfileFail());
            console.log("error: " + error);
          });
      })
      .catch((error) => {
        // Authentication failed
        dispatch(actionLogInFail(error));
        console.log("error: " + error);
      });
  }

  // Effect that fires when the "logIn" state in the Redux store changes
  useEffect(() => {
    if (stateRetrieved.logIn === true) {
      // If the user is logged in, redirect to the "/User" page
      navigate("/User");
    }
  }, [stateRetrieved, navigate]);

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={(event) => submissionSignIn(event)}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            onChange={(event) => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button">Sign In</button>
        {stateRetrieved.profileError ? (
          <p className="error-message-login">
            Username or password is wrong, or the both. Please retry your
            typing.
          </p>
        ) : null}
      </form>
    </section>
  );
}

export default SignInUser;
