import { configureStore } from "@reduxjs/toolkit";
import personalSliceReducer from "./Slices/personalDetailSlice.js";

const store = configureStore({
  reducer: {
    personalDetail: personalSliceReducer,
  },
});

export default store;
