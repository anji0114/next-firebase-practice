import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "src/state/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
