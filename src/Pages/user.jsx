import React from "react";
import Accounts from "../Components/accounts.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserProfile } from "../Services/apiCalls.js";
import {
  actionUpdateUserProfile,
  actionUpdateUserProfileFail,
} from "../Redux/action.js";

function User() {
  const stateRetrieved = useSelector((state) => state);
  const [editName, setEditName] = useState(false);
  const [entryFirstName, setEntryFirstName] = useState("");
  const [entryLastName, setEntryLastName] = useState("");
  const dispatch = useDispatch();

  // Fonction pour ouvrir l'affichage de modification du profil
  function openModificationDisplayOfProfile() {
    setEditName(true);
  }

  // Fonction pour ouvrir l'affichage du profil
  function openDisplayOfProfile() {
    setEditName(false);
  }

  // Fonction pour enregistrer les données du profil
  function recordingDataProfile() {
    const regexNames = /^[a-zA-Z-]+$/;
    let namesAreValid =
      regexNames.test(entryFirstName) && regexNames.test(entryLastName);

    if (namesAreValid && entryFirstName !== "" && entryLastName !== "") {
      updateUserProfile(stateRetrieved.token, entryFirstName, entryLastName)
        .then(function (response) {
          response
            .json()
            .then(function (data) {
              dispatch(actionUpdateUserProfile(data.body));
              setEditName(false);
            })
            .catch(function (error) {
              dispatch(actionUpdateUserProfileFail(error));
              console.log("error: " + error);
            });
        })
        .catch(function (error) {
          dispatch(actionUpdateUserProfileFail(error));
          console.log("error: " + error);
        });
    } else {
      dispatch(actionUpdateUserProfileFail("Invalid names or empty fields"));
    }
  }

  return (
    <main className="main2 bg-dark">
      {editName === false ? (
        // Affichage du profil en mode habituel
        <div>
          <div className="header">
            <h1>
              Welcome back
              <br />
              {stateRetrieved.firstName + " " + stateRetrieved.lastName} !
            </h1>
            <button
              className="edit-button"
              onClick={() => openModificationDisplayOfProfile()}
            >
              Edit Name
            </button>
          </div>
          <Accounts userProfileDisplay="modeUsual" />
        </div>
      ) : (
        // Affichage du profil en mode édition
        <div>
          <div className="header2">
            <h1 className="header2-title">Welcome back</h1>
            <div>
              <input
                type="text"
                name="input-first-name"
                id="input-first-name"
                placeholder="Tony"
                onChange={(event) => setEntryFirstName(event.target.value)}
              />
              <input
                type="text"
                name="input-last-name"
                id="input-last-name"
                placeholder="Jarvis"
                onChange={(event) => setEntryLastName(event.target.value)}
              />
            </div>
            {stateRetrieved.profileError
              ? (console.log(stateRetrieved),
                (
                  // Affichage du message d'erreur si les données sont invalides
                  <p className="error-message-editProfile">
                    FirstName / LastName are missing or FirstName / LastName
                    have a bad format.
                    <br />
                    Authorized characters: A to Z, a to z, and -
                    <br />
                    Please retry your typing.
                  </p>
                ))
              : null}
            <div className="container-buttonsSaveAndCancel">
              <button
                className="button-save"
                onClick={() => recordingDataProfile()}
              >
                Save
              </button>
              <button
                className="button-cancel"
                onClick={() => openDisplayOfProfile()}
              >
                Cancel
              </button>
            </div>
          </div>
          <Accounts userProfileDisplay="modeEdit" />
        </div>
      )}
    </main>
  );
}

export default User;
