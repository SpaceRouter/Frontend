import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage';

import { isOpenSideBar, titlePage, auth } from "./reducer";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"]
};

const rootReducer = combineReducers({
  isOpenSideBar: isOpenSideBar,
  titlePage: titlePage,
  auth: auth,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
