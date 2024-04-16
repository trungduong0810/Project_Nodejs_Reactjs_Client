import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null,
};

export const changeAvatarUser = createSlice({
  name: "changeAvatarUser",
  initialState,
  reducers: {
    changeAvatar: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeAvatar } = changeAvatarUser.actions;
export default changeAvatarUser.reducer;
