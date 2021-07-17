import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import rootReducer from "./rootReducer";

const enhancer = compose(
    applyMiddleware(thunk)
  );
const store = createStore(rootReducer,enhancer);

export default store;
