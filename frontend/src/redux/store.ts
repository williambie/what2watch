import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, searchReducer);

export const store = configureStore({
  reducer: {
    search: persistedReducer,
  },
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
