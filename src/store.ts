import { configureStore } from "@reduxjs/toolkit";
import selectedDaySlice from "./slices/selectedDaySlice";
import selectedReadsCounter from "./slices/readsCounterSlice";
import selectedGroupsSlice from "./slices/groupsSlice";
import selectedGroupSlice from "./slices/selectedGroupSlice";

export const store = configureStore({
  reducer: {
    selectedDay: selectedDaySlice,
    selectedReads: selectedReadsCounter,
    selectedGroups: selectedGroupsSlice,
    selectedGroup: selectedGroupSlice
  },
});
