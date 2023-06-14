import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/home.jsx";
import SignIn from "./Pages/signin.jsx";
import User from "./Pages/user.jsx";
import Error from "./Pages/error.jsx";
import Header from "./Components/header.jsx";
import Footer from "./Components/footer.jsx";
import { useDispatch } from "react-redux";
import { getUserProfile } from "./Services/apiCalls.js";
import {
  actionGetUserProfile,
  actionGetUserProfileFail,
  actionLogInPassLocalStorage,
} from "./Redux/action.js";

function App() {
  const dispatch = useDispatch();

  async function retrievePersistentConnection() {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(actionLogInPassLocalStorage(token));
      getUserProfile(token)
        .then(function (response) {
          dispatch(actionGetUserProfile(response));
        })
        .catch(function () {
          dispatch(actionGetUserProfileFail());
        });
    }
  }

  // if you left the application when your are log in and go to an other website, then if you returned to
  // the application you will keep your log in status and you won't have to log in again

  useEffect(() => {
    retrievePersistentConnection();
  });

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Sign-in" element={<SignIn />} />
          <Route path="/User" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
