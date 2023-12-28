import { configureStore } from "@reduxjs/toolkit";
import selectedDaySlice from "./slices/selectedDaySlice";

export const store = configureStore({
  reducer: {
    selectedDay: selectedDaySlice,
  },
});
