import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
    activeSidebar: (state) => {
      state.collapsed = false;
    },
  },
});

export const { toggleSidebar, activeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
