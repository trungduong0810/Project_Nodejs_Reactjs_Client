import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const searchProduct = createSlice({
  name: "searchProduct",
  initialState,
  reducers: {
    searchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchValue } = searchProduct.actions;
export default searchProduct.reducer;
