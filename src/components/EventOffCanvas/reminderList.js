import useDateReminders from "../../hooks/useDateReminders";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faBroom,
} from "@fortawesome/free-solid-svg-icons";

const ReminderList = ({
  date,
  editReminder,
  removeReminder,
  clearAllReminders,
}) => {
  const { dateReminders } = useDateReminders(date);

  let reminders = [];
  if (dateReminders?.length > 0) {
    dateReminders.map((e) =>
      reminders.push(
        <div
          key={e.time}
          style={{ background: e.color }}
          className="reminder-container row mb-1 mt-0"
        >
          <div className="row my-0">
            <div className="col-6">{e.geoLoc.region}</div>
            <div className="col-2">{e.time}</div>
            <div className="col-4">{e.weather.main}</div>
          </div>
          <div className="row mb-1 mt-0">
            <div className="col-12">{e.description}</div>
          </div>
          <div className="row d-flex justify-content-center">
            <FontAwesomeIcon
              onClick={() => editReminder(e)}
              className="col-1"
              icon={faPencil}
            />

            <FontAwesomeIcon
              onClick={() => removeReminder(e)}
              className="col-1"
              icon={faTrashCan}
            />
          </div>
        </div>
      )
    );
  }
  return (
    <div className="reminder-list">
      {reminders.length > 0 && (
        <div>
          <h1>Reminders</h1>
          clear all
          <FontAwesomeIcon onClick={() => clearAllReminders()} icon={faBroom} />
        </div>
      )}
      {reminders}
    </div>
  );
};

export default ReminderList;
