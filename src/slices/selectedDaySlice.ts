import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDay: JSON.stringify(new Date()),
};

export const selectedDaySlice = createSlice({
  name: "selectedDay",
  initialState,
  reducers: {
    setSelectedDayInStore: (state, action) => {
      state.selectedDay = JSON.parse(action.payload);
    },
  },
});

export const { setSelectedDayInStore } = selectedDaySlice.actions;
export const selectedDay = (state: any) => state.selectedDay;

export default selectedDaySlice.reducer;
