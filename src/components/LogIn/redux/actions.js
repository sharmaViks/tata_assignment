import { httpService } from "../../../services/httpService";
import { loginActionTypes } from "./types";

function login(user) {
  return (dispatch) => {
    dispatch(request(user));
    httpService.postData(user,'/api/authenticate').then(
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

  function request(user) {
    return {
      type: loginActionTypes.LOGIN_USER_REQUEST,
      payload:user.email
    };
  }
  function success(response) {
    return {
      type: loginActionTypes.LOGIN_USER_SUCCESS,
      payload: response,
    };
  }
  function failure(response) {
    return {
      type: loginActionTypes.LOGIN_USER_FAILURE,
      payload: response,
    };
  }
}

function resetMessage() {
  return (dispatch) => {
    dispatch({ type: loginActionTypes.RESET_MESSAGE });
  };
}

export const loginActions = {
  login,
  resetMessage,
};
