import { combineReducers } from "redux";

import signupReducer from "../components/SignUp/redux/reducer";
import loginReducer from "../components/LogIn/redux/reducer";

const rootReducer = combineReducers({
  signup: signupReducer,
  login:loginReducer
});

export default rootReducer;
