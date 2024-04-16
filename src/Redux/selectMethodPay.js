import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const selectMethodPayment = createSlice({
  name: "selectMethodPayment",
  initialState,
  reducers: {
    selectMethodPay: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectMethodPay } = selectMethodPayment.actions;
export default selectMethodPayment.reducer;
