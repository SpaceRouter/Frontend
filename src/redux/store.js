import { createStore, combineReducers } from "redux";

import { isOpenSideBar, titlePage, indexUser, users } from "./reducer";

const rootReducer = combineReducers({
  isOpenSideBar: isOpenSideBar,
  titlePage: titlePage,
  indexUser: indexUser,
  users: users,
});

export const store = createStore(rootReducer);