import { useSelector } from "react-redux";
import { selectRemindersForDate } from "../state/reminders";

const useDateReminders = (date) => {
  const calendarId = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const dateRemindersReduxState = useSelector(
    selectRemindersForDate(calendarId)
  );
  const dateReminders = dateRemindersReduxState;

  return { dateReminders };
};

export default useDateReminders;
