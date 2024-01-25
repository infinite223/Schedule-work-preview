import { createSlice } from "@reduxjs/toolkit";
const nowDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);
const initialState = {
    selectedDay: JSON.stringify(nowDate),
};

export const selectedDaySlice = createSlice({
  name: "selectedDay",
  initialState,
  reducers: {
    setSelectedDayInStore: (state, action) => {
      state.selectedDay = action.payload;
    },
  },
});

export const { setSelectedDayInStore } = selectedDaySlice.actions;
export const selectedDay = (state: any) => state.selectedDay;

export default selectedDaySlice.reducer;
