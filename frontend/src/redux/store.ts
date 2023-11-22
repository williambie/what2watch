import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import alertReducer from "./alertSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persisting the state to local storage
const persistConfig = {
  key: "root",
  storage,
};

// Persisting only the search state
const persistedReducer = persistReducer(persistConfig, searchReducer);

// Creating the store
export const store = configureStore({
  reducer: {
    search: persistedReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
