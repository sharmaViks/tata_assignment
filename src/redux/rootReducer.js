import { combineReducers } from "redux";

import signupReducer from "../components/SignUp/redux/reducer";
import loginReducer from "../components/LogIn/redux/reducer";
import mealsReducer from "../components/Meals/redux/reducer";

const rootReducer = combineReducers({
  signup: signupReducer,
  login:loginReducer,
  meals:mealsReducer
});

export default rootReducer;
