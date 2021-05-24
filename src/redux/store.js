import { createStore, combineReducers } from "redux";

import { isOpenSideBar, titlePage } from "./reducer";

const rootReducer = combineReducers({
  isOpenSideBar: isOpenSideBar,
  titlePage: titlePage,
});

export const store = createStore(rootReducer);