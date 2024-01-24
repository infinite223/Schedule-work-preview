import {createSlice} from "@reduxjs/toolkit";


const initialState = {group: null};

export const selectedGroupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      console.log("groups: " + state.group);
      state.group = action.payload;
    },
  },
});

export const {setGroup} = selectedGroupSlice.actions;
export const selectedGroup = (state: any) => state.selectedGroup.group;

export default selectedGroupSlice.reducer;
