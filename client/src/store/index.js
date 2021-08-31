import {applyMiddleware} from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

import { createStore } from "redux";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  
export default store;