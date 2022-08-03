import { actualMonthToRender, WEEK } from "../../lib/date";
import DayCell from "../DayCell";

import "./calendar.css";

const Calendar = () => {
  const monthToRender = actualMonthToRender();
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
  return (
    <>
      {/* TODO: MOVE TO GRID */}
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
