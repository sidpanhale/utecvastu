import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

export const scoreSlice = createSlice({
  name: "score",
  initialState: { value: initialStateValue },
  reducers: {
    transferData: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { transferData } = scoreSlice.actions;

export default scoreSlice.reducer;
