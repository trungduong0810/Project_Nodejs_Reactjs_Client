import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const selectReviewProduct = createSlice({
  name: "selectReviewProduct",
  initialState,
  reducers: {
    selectReview: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectReview } = selectReviewProduct.actions;
export default selectReviewProduct.reducer;
