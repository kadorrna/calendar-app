import { Button } from "react-bootstrap";

const DatePicker = ({ calendarDate, updateCalendar }) => {
  return (
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
  );
};

export default DatePicker;
