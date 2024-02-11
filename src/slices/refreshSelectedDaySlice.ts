import {createSlice} from "@reduxjs/toolkit";

const initialState = {value: 0};

export const refreshSelectedDaySlice = createSlice({
  name: "refreshSelectedDay",
  initialState,
  reducers: {
    setRefreshSelectedDay: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});

export const {setRefreshSelectedDay} = refreshSelectedDaySlice.actions;
export const selectRefreshSelectedDay = (state: any) => state.refreshSelectedDay.value;

export default refreshSelectedDaySlice.reducer;
