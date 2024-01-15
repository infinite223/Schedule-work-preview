import { configureStore } from "@reduxjs/toolkit";
import selectedDaySlice from "./slices/selectedDaySlice";
import selectedReadsCounter  from "./slices/readsCounterSlice";

export const store = configureStore({
  reducer: {
    selectedDay: selectedDaySlice,
    selectedReads: selectedReadsCounter
  },
});
