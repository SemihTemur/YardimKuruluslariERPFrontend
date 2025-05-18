import { configureStore } from "@reduxjs/toolkit";
import cashReducer from "./cashSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cash: cashReducer,
    auth: authReducer,
  },
});

export default store;
