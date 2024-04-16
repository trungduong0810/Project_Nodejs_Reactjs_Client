import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const avatarUser = createSlice({
  name: "avatarUser",
  initialState,
  reducers: {
    avatar: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { avatar } = avatarUser.actions;
export default avatarUser.reducer;
