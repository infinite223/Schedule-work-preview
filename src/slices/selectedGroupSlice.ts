import {createSlice} from "@reduxjs/toolkit";

const initGroups = 
    {
        id: "1",
        name: "Kierowcy",
        users: [{nick: "Dawid", id: "2"}, {nick: "Wojtek", id: '4'}],
    }

const initialState = {group: initGroups};

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
