import { legacy_createStore as createStore } from "redux";
import CombineReducers from "../Reducers/Index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default localStorage

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, CombineReducers);

const Store = createStore(
  persistedReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(Store);

export default Store;
