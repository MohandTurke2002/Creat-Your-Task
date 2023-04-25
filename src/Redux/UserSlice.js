import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
};

export const NavSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    userNameCh: (state, action) => {
      state.username = action.payload;
    },
    userEmail: (state, action) => {
      state.email = action.payload;
    },
    userPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userNameCh, userEmail, userPassword } = NavSlice.actions;

export default NavSlice.reducer;
