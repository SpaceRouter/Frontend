import { UPDATE_STATE_SIDE_BAR, UPDATE_TITLE_PAGE, UPDATE_AUTH } from "./action";

//Navigation
const isOpenSideBarReducer = (state = false, action) => {
  if (action.type === UPDATE_STATE_SIDE_BAR) return action.payload;
  return state;
};
const titlePageReducer = (state = "", action) => {
  if (action.type === UPDATE_TITLE_PAGE) return action.payload;
  return state;
};
const authReducer = (state = false, action) => {
  if (action.type === UPDATE_AUTH) return action.payload;
  return state;
};

export const isOpenSideBar = isOpenSideBarReducer;
export const titlePage = titlePageReducer;
export const auth = authReducer; 