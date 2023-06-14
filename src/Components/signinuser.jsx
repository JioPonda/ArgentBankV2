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
  // États locaux
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Dispatch et sélecteur Redux
  const dispatch = useDispatch();
  const stateRetrieved = useSelector((state) => state);

  // Navigation
  const navigate = useNavigate();

  // Fonction de soumission du formulaire de connexion
  function submissionSignIn(event) {
    event.preventDefault();
    getTokenLogin(email, password)
      .then((token) => {
        // Authentification réussie
        dispatch(actionLogInPass(token)); // Dispatch de l'action pour connecter l'utilisateur
        getUserProfile(token)
          .then((response) => {
            // Récupération du profil utilisateur
            dispatch(actionGetUserProfile(response)); // Dispatch de l'action pour stocker le profil utilisateur
            recordOfTokenInLocalStorage(token, rememberMe); // Enregistrement du token dans le stockage local
          })
          .catch((error) => {
            // Échec de la récupération du profil utilisateur
            dispatch(actionGetUserProfileFail()); // Dispatch de l'action pour gérer l'échec de la récupération du profil
            console.log("error: " + error);
          });
      })
      .catch((error) => {
        // Échec de l'authentification
        dispatch(actionLogInFail(error)); // Dispatch de l'action pour gérer l'échec de l'authentification
        console.log("error: " + error);
      });
  }

  // Effet qui se déclenche lorsque l'état "logIn" dans le store Redux change
  useEffect(() => {
    if (stateRetrieved.logIn === true) {
      // Si l'utilisateur est connecté, redirection vers la page "/User"
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
        {stateRetrieved.error ? (
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
