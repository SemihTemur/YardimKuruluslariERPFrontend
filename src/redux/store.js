import { configureStore } from "@reduxjs/toolkit";
import cashReducer from "./cashSlice";

export const store = configureStore({
  reducer: {
    cash: cashReducer,
  },
});

export default store;
