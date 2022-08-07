import { useState } from "react";
import { WEEK, monthToRender as libMonthToRender } from "../../lib/date";
import DayCell from "../DayCell";
import CalendarMonthYearSelector from "./CalendarMonthYearSelector";

import "./calendar.css";

const Calendar = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [monthToRender, setMonthToRender] = useState(
    libMonthToRender(calendarDate.getMonth(), calendarDate.getFullYear())
  );

  const monthRows = monthToRender.length / 7;
  const renderMonths = () => {
    let grid = [];
    for (let i = 0; i < monthRows; i++) {
      let children = [];
      for (let j = 0; j < 7; j++) {
        const position = 7 * i + j;
        children.push(
          <DayCell dateInfo={monthToRender[position]} key={position} />
        );
      }
      grid.push(children);
    }
    return grid;
  };

  const updateCalendarRender = (date) => {
    setMonthToRender(libMonthToRender(date.getMonth(), date.getFullYear()));
    setCalendarDate(date);
  };

  return (
    <>
      <section id="monthAndYear">
        <CalendarMonthYearSelector
          calendarDate={calendarDate}
          updateCalendar={(date) => updateCalendarRender(date)}
        />
      </section>
      <section id="calendar">
        <section id="calendar-header">
          {WEEK.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </section>
        <section id="calendar-main">{renderMonths()}</section>
      </section>
    </>
  );
};

export default Calendar;
