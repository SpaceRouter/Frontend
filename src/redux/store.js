import { createStore, combineReducers } from "redux";

import { isOpenSideBar, titlePage, auth } from "./reducer";

const rootReducer = combineReducers({
  isOpenSideBar: isOpenSideBar,
  titlePage: titlePage,
  auth: auth,
});

export const store = createStore(rootReducer);