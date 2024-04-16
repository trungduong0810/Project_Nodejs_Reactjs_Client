import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
};

export const getUserId = createSlice({
  name: "getUserId",
  initialState,
  reducers: {
    userId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { userId } = getUserId.actions;
export default getUserId.reducer;
