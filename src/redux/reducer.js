import { UPDATE_STATE_SIDE_BAR, UPDATE_TITLE_PAGE, UPDATE_INDEX_USER, UPDATE_USERS } from "./action.js";

//Navigation bar
const isOpenSideBarReducer = (state = false, action) => {
  if (action.type === UPDATE_STATE_SIDE_BAR) return action.payload;
  return state;
};
const titlePageReducer = (state = "", action) => {
  if (action.type === UPDATE_TITLE_PAGE) return action.payload;
  return state;
};
//Users
const indexUserReducer = (state = 0, action) => {
  if (action.type === UPDATE_INDEX_USER) return action.payload;
  return state;
};
const usersReducer = (state = [], action) => {
  if (action.type === UPDATE_USERS) return action.payload;
  return state;
};

export const isOpenSideBar = isOpenSideBarReducer;
export const titlePage = titlePageReducer;
export const indexUser = indexUserReducer;
export const users = usersReducer;