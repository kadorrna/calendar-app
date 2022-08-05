import { useSelector } from "react-redux";
import { selectBookingsForDate } from "../features/reminders";

const useBookedTimes = (date) => {
  const calendarId = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const dateRemindersReduxState = useSelector(
    selectBookingsForDate(calendarId)
  );

  const bookedTimes = dateRemindersReduxState;

  return { bookedTimes };
};

export default useBookedTimes;
