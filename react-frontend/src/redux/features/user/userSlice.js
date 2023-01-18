import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  userData: {
    name: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_USERNAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SAVE_USERDATA(state, action) {
      const userProfile = action.payload;
      state.userData.name = userProfile.name;
      state.userData.email = userProfile.email;
    },
  },
});

export const { SET_LOGIN, SET_USERNAME, SAVE_USERDATA } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectName = (state) => state.user.name;
export const selectUserData = (state) => state.user.userData;

export default userSlice.reducer;
