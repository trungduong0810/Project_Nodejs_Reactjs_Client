import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {},
};

export const updateDetailNews = createSlice({
  name: "updateDetailNews",
  initialState,
  reducers: {
    updateNews: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateNews } = updateDetailNews.actions;
export default updateDetailNews.reducer;
