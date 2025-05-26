import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // सही path का ध्यान रखें

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
