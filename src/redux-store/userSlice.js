import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    personalInfo: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
    },
  },

  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
  },
});

export const { setPersonalInfo } = userSlice.actions;
export default userSlice.reducer;
