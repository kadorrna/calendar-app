import { createSlice } from "@reduxjs/toolkit";

export const remindersSlice = createSlice({
  name: "reminders",
  initialState: [],
  reducers: {
    addReminder: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    removeReminder: (state) => {
      state.value -= 1;
    },
  },
});

export const { addReminder, removeReminder } = remindersSlice.actions;

export default remindersSlice.reducer;
