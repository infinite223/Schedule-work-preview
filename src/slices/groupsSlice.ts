import {createSlice} from "@reduxjs/toolkit";

const initGroups = [
    {
        id: "1",
        name: "Kierowcy",
        users: [{nick: "Dawid"}, {nick: "Marek"}],
        userId: '2'
    },
    {
        id: "2",
        name: "Bar",
        users: [{nick: "Dawid"}, {nick: "Marek"}],
        userId: "1"
    }
]
const initialState = {groups: initGroups};

export const selectedGroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      console.log("groups: " + state.groups);
      state.groups = state.groups + action.payload;
    },
  },
});

export const {setGroups} = selectedGroupsSlice.actions;
export const selectedGroups = (state: any) => state.selectedGroups.groups;

export default selectedGroupsSlice.reducer;
