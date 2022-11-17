import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/index.api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
