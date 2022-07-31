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
    let table = [];
    for (let i = 0; i < monthRows; i++) {
      let children = [];
      for (let j = 0; j < 7; j++) {
        const position = 7 * i + j;
        children.push(
          <DayCell dateInfo={monthToRender[position]} key={position} />
        );
      }
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };
  return (
    <>
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
