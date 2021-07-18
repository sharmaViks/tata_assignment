import { mealActionTypes } from "./types";

const INITIAL_STATE = {
  start_updating_meal: false,
  success_message: null,
  failure_message: null,
  all_meals: [],
  start_getting_meals: false,
  start_deleting_meal:false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case mealActionTypes.UPDATE_MEAL_REQUEST:
      return { ...state, start_updating_meal: true };
    case mealActionTypes.UPDATE_MEAL_SUCCESS:
      return {
        ...state,
        start_updating_meal: false,
        success_message: action.payload,
      };
    case mealActionTypes.UPDATE_MEAL_FAILURE:
      return {
        ...state,
        start_updating_meal: false,
        failure_message: action.payload,
      };
    case mealActionTypes.GET_MEALS_REQUEST:
      return { ...state, start_getting_meals: true };
    case mealActionTypes.GET_MEALS_SUCCESS:
      return {
        ...state,
        start_getting_meals: false,
        all_meals: action.payload,
      };
    case mealActionTypes.GET_MEALS_FAILURE:
      return {
        ...state,
        start_getting_meals: false,
        failure_message: action.payload,
      };
    case mealActionTypes.DELETE_MEAL_REQUEST:
      return { ...state, start_deleting_meal: true };
    case mealActionTypes.DELETE_MEAL_SUCCESS:
      return {
        ...state,
        start_deleting_meal: false,
        success_message: action.payload,
      };
    case mealActionTypes.DELETE_MEAL_FAILURE:
      return {
        ...state,
        start_deleting_meal: false,
        failure_message: action.payload,
      };
    case mealActionTypes.RESET_MESSAGE:
      return {
        ...state,
        start_updating_meal: false,
        start_getting_meals: false,
        failure_message: null,
        success_message: null,
      };
    default:
      return state;
  }
};

export default reducer;
