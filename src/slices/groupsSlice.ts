import {createSlice} from "@reduxjs/toolkit";

const initialState = {groups: []};

export const selectedGroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const {setGroups} = selectedGroupsSlice.actions;
export const selectedGroups = (state: any) => state.selectedGroups.groups;

export default selectedGroupsSlice.reducer;
