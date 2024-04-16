import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
};

export const getSenderIdChat = createSlice({
  name: "getSenderIdChat",
  initialState,
  reducers: {
    senderIdChat: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { senderIdChat } = getSenderIdChat.actions;
export default getSenderIdChat.reducer;
