import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};

export const cartBuyNowData = createSlice({
  name: "cartBuyNowData",
  initialState,
  reducers: {
    cartBuyNow: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { cartBuyNow } = cartBuyNowData.actions;
export default cartBuyNowData.reducer;
