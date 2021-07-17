import { combineReducers } from "redux";

import signupReducer from "../components/SignUp/redux/reducer";

const rootReducer = combineReducers({
  signup: signupReducer
});

export default rootReducer;
