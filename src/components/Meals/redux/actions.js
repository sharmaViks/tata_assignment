import { httpService } from "../../../services/httpService";
import { mealActionTypes } from "./types";

function updateMeal(meal) {
  return (dispatch) => {
    dispatch(request());
    httpService.postData(meal,'/api/updateMeal').then(
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
      type: mealActionTypes.UPDATE_MEAL_REQUEST,
    };
  }
  function success(response) {
    return {
      type: mealActionTypes.UPDATE_MEAL_SUCCESS,
      payload: response,
    };
  }
  function failure(response) {
    return {
      type: mealActionTypes.UPDATE_MEAL_FAILURE,
      payload: response,
    };
  }
}


function getMeals() {
  return (dispatch) => {
    dispatch(request());
    httpService.getData('/api/getMeals').then(
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
      type: mealActionTypes.GET_MEALS_REQUEST,
    };
  }
  function success(response) {
    return {
      type: mealActionTypes.GET_MEALS_SUCCESS,
      payload: response.meals,
    };
  }
  function failure(response) {
    return {
      type: mealActionTypes.GET_MEALS_FAILURE,
      payload: response,
    };
  }
}

function deleteMeal(meal_id) {
  return (dispatch) => {
    dispatch(request());
    httpService.deleteData({"meal_id":meal_id},'/api/deleteMeal').then(
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
      type: mealActionTypes.DELETE_MEAL_REQUEST,
    };
  }
  function success(response) {
    return {
      type: mealActionTypes.DELETE_MEAL_SUCCESS,
      payload: response,
    };
  }
  function failure(response) {
    return {
      type: mealActionTypes.DELETE_MEAL_FAILURE,
      payload: response,
    };
  }
}


function resetMessage() {
  return (dispatch) => {
    dispatch({ type: mealActionTypes.RESET_MESSAGE });
  };
}

export const mealActions = {
  updateMeal,
  resetMessage,
  getMeals,
  deleteMeal
};
