//Action types
export const UPDATE_STATE_SIDE_BAR = "UPDATE_STATE_SIDE_BAR";
export const UPDATE_TITLE_PAGE = "UPDATE_TITLE_PAGE";
export const UPDATE_AUTH = "UPDATE_AUTH";

//Action creators
//Navigation
export const updateSideBarState = (update) => ({
  type: UPDATE_STATE_SIDE_BAR,
  payload: update,
});
export const updateTitlePage = (update) => ({
  type: UPDATE_TITLE_PAGE,
  payload: update,
});
export const updateAuth = (update) => ({
  type: UPDATE_AUTH,
  payload: update,
})
