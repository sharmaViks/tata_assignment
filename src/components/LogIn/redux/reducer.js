import { loginActionTypes } from "./types";

const INITIAL_STATE = {
  start_login: false,
  success_message: null,
  failure_message: null,
  email:null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginActionTypes.LOGIN_USER_REQUEST:
      return { ...state, start_login: true ,email:action.payload };
    case loginActionTypes.LOGIN_USER_SUCCESS:
      return { ...state, start_login: false, success_message: action.payload };
    case loginActionTypes.LOGIN_USER_FAILURE:
      return { ...state, start_login: false, failure_message: action.payload };
    case loginActionTypes.RESET_MESSAGE:
      return {
        ...state,
        start_login: false,
        failure_message: null,
        success_message: null,
      };
    default:
      return state;
  }
};

export default reducer;
