import { useState } from "react";
import { WEEK, monthToRender as libMonthToRender } from "../../modules/date";

import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";

import "./calendar.css";

const CalendarDays = () => {
  return (
    <section id="calendar-header">
      {WEEK.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </section>
  );
};

const Calendar = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [monthToRender, setMonthToRender] = useState(
    libMonthToRender(calendarDate.getMonth(), calendarDate.getFullYear())
  );
  const updateCalendarRender = (date) => {
    setMonthToRender(libMonthToRender(date.getMonth(), date.getFullYear()));
    setCalendarDate(date);
  };

  return (
    <>
      <CalendarHeader
        calendarDate={calendarDate}
        updateCalendar={(date) => updateCalendarRender(date)}
      />
      <CalendarDays />
      <CalendarGrid monthToRender={monthToRender} />
    </>
  );
};

export default Calendar;
