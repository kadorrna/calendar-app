import { configureStore } from "@reduxjs/toolkit";
import remindersReducer from "./reminders";

export default configureStore({
  reducer: {
    reminders: remindersReducer,
  },
});
