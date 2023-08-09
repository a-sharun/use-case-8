import { combineReducers, createStore } from "redux";
import { userFormDataReducer } from "./reducers/userFormDataReducer";

const store = createStore(
  combineReducers({ userFormData: userFormDataReducer })
);

export default store;
