import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminlogin: false,
  users: [],
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminSignIn: (state) => {
      state.loading = false;
      state.error = false;
      state.adminlogin = true;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
      state.adminlogin = true;
    },
    admintLogout: (state) => {
      state.loading = false;
      state.error = false;
      state.adminlogin = false;
    },
  },
});
export const { getUsers, signInFailure, adminSignIn, admintLogout } = adminSlice.actions; 

export default adminSlice.reducer;
