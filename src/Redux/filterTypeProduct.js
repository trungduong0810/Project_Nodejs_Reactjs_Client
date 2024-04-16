import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const filterTypeProduct = createSlice({
  name: "filterTypeProduct",
  initialState,
  reducers: {
    filterType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { filterType } = filterTypeProduct.actions;
export default filterTypeProduct.reducer;
