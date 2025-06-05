import { createSlice } from "@reduxjs/toolkit";

// 1.create slice
const personalDetailSlice = createSlice({
  // 2.name of slice
  name: "personalDetail",
  //   3.initial value of slices
  initialState: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
  },
  // 4.reducers
  reducers: {},
  setPersonalDetail: (state, action) => {
    return { ...state, ...action.payload };
  },
  clearPersonalDetail: () => {},
});

export const { setPersonalDetail, clearPersonalDetail } =
  personalDetailSlice.actions;

export default personalDetailSlice.reducer;
