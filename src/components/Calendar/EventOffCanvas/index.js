import { useState } from "react";
import { useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  removeReminder as removeReminderFromReduxState,
  clearReminders,
} from "../../../state/reminders";
import ReminderForm from "./reminderForm";
import ReminderList from "./reminderList";
import { MONTHS } from "../../../modules/date";
import "./event-off.css";

const defaultFormValues = {
  reminderTimeToRemove: "",
  isEdit: false,
  description: "",
  reminderColor: {
    hex: "#dedede",
  },
  time: "10:00",
  geoLoc: {
    region: "",
    country: "",
  },
  weather: {},
};

const EventOffCanvas = ({ show, date, handleClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(defaultFormValues);
  const calendarId = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const dispatch = useDispatch();

  const clearAllReminders = () => {
    dispatch(clearReminders({ calendarId }));
  };
  const removeReminder = (value) => {
    dispatch(
      removeReminderFromReduxState({
        calendarId,
        reminderTimeToRemove: value.time,
      })
    );
  };
  const editReminder = (reminder) => {
    setInitialFormValues({
      ...reminder,
      reminderColor: { hex: reminder.color },
      isEdit: true,
      reminderTimeToRemove: reminder.time,
    });
    setShowForm(true);
  };
  const hideForm = () => {
    setShowForm(false);
    setInitialFormValues(defaultFormValues);
  };

  const closeCanvass = () => {
    hideForm();
    handleClose();
  };

  return (
    <>
      <Offcanvas show={show} onHide={closeCanvass}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1>
              {date.getDate()} - {MONTHS[date.getMonth()]} -{" "}
              {date.getFullYear()}
            </h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!showForm && (
            <ReminderList
              date={date}
              editReminder={editReminder}
              removeReminder={removeReminder}
              clearAllReminders={clearAllReminders}
              addReminder={() => setShowForm(true)}
            />
          )}
          {showForm && (
            <ReminderForm
              date={date}
              hideForm={() => hideForm()}
              initialFormValues={initialFormValues}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EventOffCanvas;
