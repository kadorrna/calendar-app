const useReminders = (date) => {
  const calendarId = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  let oldReminders = localStorage.getItem("calendar-demo-reminders");
  oldReminders = oldReminders ? JSON.parse(oldReminders) : [];
  const dateReminders =
    oldReminders.length > 0
      ? oldReminders.find((e) => e.id === calendarId)?.reminders
      : [];

  const bookedTimes = dateReminders?.map((e) => e.time) || [];

  return { oldReminders, dateReminders, bookedTimes };
};

export default useReminders;
