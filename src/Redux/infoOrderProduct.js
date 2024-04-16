import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const infoOrderProduct = createSlice({
  name: "infoOrderProduct",
  initialState,
  reducers: {
    infoOrder: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { infoOrder } = infoOrderProduct.actions;
export default infoOrderProduct.reducer;
