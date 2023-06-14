import { createStore } from "redux";
import { loginReducer } from "./reducers";
// Connection of Redux store to the add-on Redux Devtools, we retreive the Devtools and if they
// exist we execute the function of Devtools

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// The store of Redux to assemble state, actions creators and reducer

export const store = createStore(loginReducer, reduxDevtools);
