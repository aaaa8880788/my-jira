
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "..";
interface State {
  projectDrawerOpen: boolean;
}

const initialState: State = {
  projectDrawerOpen: false
}

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    openProjectDrawer(state) {
      state.projectDrawerOpen = true
    },
    closeProjectDrawer(state) {
      state.projectDrawerOpen = false
    }
  }
})
export const selectProjectDrawerOpen = (state: RootState) => state.home.projectDrawerOpen
export const homeAction =  homeSlice.actions
export default homeSlice.reducer