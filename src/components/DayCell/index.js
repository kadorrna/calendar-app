import { useState } from "react";
import EventOffCanvas from "../EventOffCanvas";
import "./dayCell.css";

const DayCell = ({ dateInfo }) => {
  const [show, setShow] = useState(false);

  const toggleCanvas = () => setShow(!show);

  return (
    <td>
      <div className={dateInfo.css} onClick={toggleCanvas}>
        {dateInfo.date.getDate()}
        <EventOffCanvas show={show} date={dateInfo.date} />
      </div>
    </td>
  );
};

export default DayCell;
