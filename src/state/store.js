import { configureStore } from "@reduxjs/toolkit";
import remindersReducer from "../features/reminders";

export default configureStore({
  reducer: {
    reminders: remindersReducer,
  },
});
