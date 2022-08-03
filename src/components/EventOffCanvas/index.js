import ReminderForm from "./reminderForm";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MONTHS } from "../../lib/date";
import "./event-off.css";

const EventOffCanvas = ({ show, date, handleClose }) => {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {date.getDate()} - {MONTHS[date.getMonth()]}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ReminderForm date={date} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EventOffCanvas;
