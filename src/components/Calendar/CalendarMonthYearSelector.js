import { MONTHS } from "../../lib/date";
import { Button } from "react-bootstrap";
import "./calendar.css";

const CalendarMonthYearSelector = ({ updateCalendar, calendarDate }) => {
  return (
    <>
      <div className="row justify-content-start mb-2">
        <div className="col-10 text-start">
          <h1>
            {MONTHS[calendarDate.getMonth()]} {calendarDate.getFullYear()}
          </h1>
        </div>
        <div className="col-2 d-flex justify-content-end my-auto month-selector">
          <div className="col py-2">
            <Button
              variant="outline-secondary"
              onClick={() =>
                updateCalendar(
                  new Date(
                    calendarDate.getFullYear(),
                    calendarDate.getMonth() - 1,
                    1
                  )
                )
              }
            >
              &lt;
            </Button>
          </div>
          <div className="col py-2" onClick={() => updateCalendar(new Date())}>
            <Button
              variant="outline-secondary"
              onClick={() => updateCalendar(new Date())}
            >
              Today
            </Button>
          </div>
          <div className="col py-2">
            <Button
              variant="outline-secondary"
              onClick={() =>
                updateCalendar(
                  new Date(
                    calendarDate.getFullYear(),
                    calendarDate.getMonth() + 1,
                    1
                  )
                )
              }
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarMonthYearSelector;
