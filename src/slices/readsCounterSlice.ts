import {createSlice} from "@reduxjs/toolkit";

const initialState = {reads: 0};

export const readsCounterSlice = createSlice({
  name: "readsCounter",
  initialState,
  reducers: {
    setReadsCounter: (state, action) => {
      console.log("reads count: " + state.reads);
      state.reads = state.reads + action.payload;
    },
  },
});

export const {setReadsCounter} = readsCounterSlice.actions;
export const selectedReadsCounter = (state: any) => state.selectedReads.reads;

export default readsCounterSlice.reducer;
