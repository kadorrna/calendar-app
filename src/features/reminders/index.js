import { createSlice } from "@reduxjs/toolkit";

const getTimeAsNumberOfMinutes = (time) => {
  var timeParts = time.split(":");

  var timeInMinutes = timeParts[0] * 60 + timeParts[1];
  return Number(timeInMinutes);
};
const getInitalReminders = () => {
  let remindersStored = localStorage.getItem("calendar-demo-reminders");
  remindersStored = remindersStored ? JSON.parse(remindersStored) : [];
  return remindersStored;
};

const dateHasReminders = (reminders, id) =>
  reminders.some((e) => {
    if (e.id === id) {
      return true;
    }
    return false;
  });

const initialState = {
  remindersSaved: getInitalReminders(),
};

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, { payload }) => {
      let updatedReminders;
      if (
        state.remindersSaved &&
        state.remindersSaved.length > 0 &&
        dateHasReminders(state.remindersSaved, payload.calendarId)
      ) {
        updatedReminders = state.remindersSaved.map((calendarReminder) => {
          if (calendarReminder.id === payload.calendarId) {
            const newReminders = [
              ...calendarReminder.reminders,
              payload.newReminder,
            ].sort(
              (a, b) =>
                getTimeAsNumberOfMinutes(a.time) -
                getTimeAsNumberOfMinutes(b.time)
            );
            return { ...calendarReminder, reminders: newReminders };
          }
          return calendarReminder;
        });
        state.remindersSaved = updatedReminders;
      } else {
        state.remindersSaved.push({
          id: payload.calendarId,
          reminders: [payload.newReminder],
        });
      }

      localStorage.setItem(
        "calendar-demo-reminders",
        JSON.stringify(state.remindersSaved)
      );
    },
  },
});

export const { addReminder } = remindersSlice.actions;

export const selectReminders = (state) => state.reminders.remindersSaved;

export const selectBookingsForDate = (id) => (store) =>
  store.reminders.remindersSaved
    .find((e) => e.id === id)
    ?.reminders.map((e) => e.time) ?? [];

export const selectRemindersForDate = (id) => (store) =>
  store.reminders.remindersSaved.find((e) => e.id === id)?.reminders ?? [];

export default remindersSlice.reducer;
