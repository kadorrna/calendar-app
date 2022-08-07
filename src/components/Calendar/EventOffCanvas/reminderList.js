import useDateReminders from "../../../hooks/useDateReminders";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faBroom,
  faClock,
  faCloudSunRain,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const ReminderList = ({
  date,
  editReminder,
  removeReminder,
  clearAllReminders,
  addReminder,
}) => {
  const { dateReminders } = useDateReminders(date);

  let reminders = [];
  if (dateReminders?.length > 0) {
    dateReminders.map((e) =>
      reminders.push(
        <div
          key={e.time}
          style={{ background: e.color }}
          className="reminder-container mb-1 mt-0"
        >
          <div className="row mx-0">
            <div className="col-10 clickable" onClick={() => editReminder(e)}>
              <div className="row pt-2">
                <div className="col-6">
                  <FontAwesomeIcon icon={faLocationDot} />
                  {e.geoLoc.region.length > 13
                    ? `${e.geoLoc.region.substring(0, 9)}...`
                    : e.geoLoc.region}
                </div>
                <div className="col-3 p-0">
                  <FontAwesomeIcon icon={faClock} />
                  {e.time}
                </div>
                <div className="col-3 p-0">
                  <FontAwesomeIcon icon={faCloudSunRain} />
                  {e.weather.main ? e.weather.main : "N/A"}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-12">{e.description}</div>
              </div>
            </div>

            <div className="col-2 reminder-actions p-0 my-auto">
              <div onClick={() => removeReminder(e)} className="p-2">
                <FontAwesomeIcon className="col-1" icon={faTrashCan} />
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
  return (
    <>
      <h2>Reminders</h2>
      <div className="row mx-0 reminders-list-header mb-4">
        <div className="col-6 px-0 text-start">
          <Button onClick={() => addReminder()} variant="outline-secondary">
            add new reminder
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        {reminders.length > 0 && (
          <div className="col-6 px-0 text-end">
            <Button
              onClick={() => clearAllReminders()}
              variant="outline-secondary"
            >
              clear all
              <FontAwesomeIcon icon={faBroom} />
            </Button>
          </div>
        )}
      </div>
      {reminders.length > 0 && (
        <div className="reminders-list">{reminders}</div>
      )}
    </>
  );
};

export default ReminderList;
