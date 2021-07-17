import { signupActionTypes } from "./types";

const INITIAL_STATE = {
  registering: false,
  success_message: null,
  failure_message: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case signupActionTypes.SIGNUP_USER_REQUEST:
      return { ...state, registering: true };
    case signupActionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, registering: false, success_message: action.payload };
    case signupActionTypes.SIGNUP_USER_FAILURE:
      return { ...state, registering: false, failure_message: action.payload };
    case signupActionTypes.RESET_MESSAGE:
      return {
        ...state,
        registering: false,
        failure_message: null,
        success_message: null,
      };
    default:
      return state;
  }
};

export default reducer;
