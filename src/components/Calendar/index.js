import { actualMonthToRender } from "../../lib/date";
import Table from "react-bootstrap/Table";
import DayCell from "../DayCell";

import "./calendar.css";

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
          {week.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </section>
        <section id="calendar-main">{renderMonths()}</section>
      </section>
    </>
  );
};

export default Calendar;
