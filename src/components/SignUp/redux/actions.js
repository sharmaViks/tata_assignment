import { httpService } from "../../../services/httpService";
import { signupActionTypes } from "./types";

function register(user) {
  return (dispatch) => {
    dispatch(request());
    httpService.register(user).then(
      (response) => {
        console.log("success response", response);
        dispatch(success(response));
      },
      (error) => {
        console.log(error, "error--------------------------");
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return {
      type: signupActionTypes.SIGNUP_USER_REQUEST,
    };
  }
  function success(response) {
    return {
      type: signupActionTypes.SIGNUP_USER_SUCCESS,
      payload: response,
    };
  }
  function failure(response) {
    return {
      type: signupActionTypes.SIGNUP_USER_FAILURE,
      payload: response,
    };
  }
}

function resetMessage() {
  return (dispatch) => {
    dispatch({ type: signupActionTypes.RESET_MESSAGE });
  };
}

export const signupActions = {
  register,
  resetMessage,
};
