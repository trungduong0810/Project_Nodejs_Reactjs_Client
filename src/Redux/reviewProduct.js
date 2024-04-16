import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {},
};

export const dataReviewProduct = createSlice({
  name: "dataReviewProduct",
  initialState,
  reducers: {
    reviewProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { reviewProduct } = dataReviewProduct.actions;
export default dataReviewProduct.reducer;
