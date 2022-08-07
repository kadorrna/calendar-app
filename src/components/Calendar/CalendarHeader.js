import { MONTHS } from "../../modules/date";

import DatePicker from "./DatePicker";

import "./calendar.css";

const CalendarHeader = ({ updateCalendar, calendarDate }) => {
  return (
    <section id="monthAndYear">
      <div className="row justify-content-start mb-2">
        <div className="col-10 text-start">
          <h1>
            {MONTHS[calendarDate.getMonth()]} {calendarDate.getFullYear()}
          </h1>
        </div>
        <DatePicker
          calendarDate={calendarDate}
          updateCalendar={updateCalendar}
        />
      </div>
    </section>
  );
};

export default CalendarHeader;
