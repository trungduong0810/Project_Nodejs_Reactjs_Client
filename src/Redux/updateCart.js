import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null,
};

export const updateCart = createSlice({
  name: "updateCart",
  initialState,
  reducers: {
    changeCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeCart } = updateCart.actions;
export default updateCart.reducer;
