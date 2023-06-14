// InitialState of Redux

export const initialState = {
  logIn: false,
  token: null,
  firstName: null,
  lastName: null,
  profileError: false,
};

// The reducer of Redux to put the actions creators

export const LOGIN_PASS = "LOGIN_PASS";

export const LOGIN_FAIL = "LOGIN_FAIL";

export const GET_USER_PROFILE = "GET_USER_PROFILE";

export const GET_USER_PROFILE_FAIL = "GET_USER_PROFILE_FAIL";

export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

export const UPDATE_USER_PROFILE_FAIL = "UPDATE_USER_PROFILE_FAIL";

export const LOG_OUT = "LOG_OUT";

export const LOGIN_PASS_LOCAL_STORAGE = "LOGIN_PASS_LOCAL_STORAGE";

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PASS:
      return {
        ...state,
        logIn: true,
        token: action.payload,
        profileError: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        profileError: true,
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        profileError: true,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        profileError: false,
      };
    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        profileError: true,
      };
    case LOG_OUT:
      return initialState;
    case LOGIN_PASS_LOCAL_STORAGE:
      return {
        ...initialState,
        logIn: true,
        token: action.payload,
      };
    default:
      return state;
  }
}
