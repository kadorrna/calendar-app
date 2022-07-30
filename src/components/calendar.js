import { actualMonthToRender } from "../lib/date";
import Table from "react-bootstrap/Table";

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
  const dt = new Date();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayInWeek = new Date(year, month, 1).getDay();

  const monthToRender = actualMonthToRender();
  const monthRows = monthToRender.length / 7;

  const renderMonths = () => {
    let table = [];
    for (let i = 0; i < monthRows; i++) {
      let children = [];
      for (let j = 0; j < 7; j++) {
        const position = 7 * i + j;
        children.push(<td key={position}>{monthToRender[position].date}</td>);
      }
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };
  return (
    <>
      year {year} month {month} days in month {daysInMonth} starts on{" "}
      {firstDayInWeek}
      <Table responsive="sm">
        <thead>
          <tr>
            {week.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderMonths()}</tbody>
      </Table>
    </>
  );
};

export default Calendar;
