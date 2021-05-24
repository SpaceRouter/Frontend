//Action types
export const UPDATE_STATE_SIDE_BAR = "UPDATE_STATE_SIDE_BAR"
export const UPDATE_TITLE_PAGE = "UPDATE_TITLE_PAGE"
export const UPDATE_INDEX_USER = "UPDATE_INDEX_USER"
export const UPDATE_USERS = "UPDATE_USERS"

//Action creators
export const updateSideBarState = (update) => ({
  type: UPDATE_STATE_SIDE_BAR,
  payload: update,
})
export const updateTitlePage = (update) => ({
  type: UPDATE_TITLE_PAGE,
  payload: update,
})
export const updateIndexUser = (update) => ({
  type: UPDATE_INDEX_USER,
  payload: update,
})
export const updateUsers = (update) => ({
  type: UPDATE_USERS,
  payload: update,
})