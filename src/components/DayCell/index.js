import { useState } from "react";
import EventOffCanvas from "../EventOffCanvas";
import SmallReminderList from "../SmallReminderList";
import "./dayCell.css";

const DayCell = ({ dateInfo }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div className={`${dateInfo.css} dayCell`} onClick={handleShow}>
        {dateInfo.date.getDate()}
        <SmallReminderList date={dateInfo.date} />
      </div>
      <EventOffCanvas
        show={show}
        date={dateInfo.date}
        handleClose={handleClose}
      />
    </>
  );
};

export default DayCell;
