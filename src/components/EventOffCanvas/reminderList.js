import useDateReminders from "../../hooks/useDateReminders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faBroom,
  faClock,
  faCloudSunRain,
  faLocationDot,
  faCircle,
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
                <div className="col-12">
                  <FontAwesomeIcon icon={faCircle} />
                  {e.description}
                </div>
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
      <>
        <h2>Reminders</h2>
        <div className="row mx-0 reminders-list-header">
          <div
            className="col-6 text-start px-0 mb-3 header-action"
            onClick={() => addReminder()}
          >
            add new reminder
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className="col-3" />
          {reminders.length > 0 && (
            <div
              className="col-3 text-end px-0 mb-3 header-action"
              onClick={() => clearAllReminders()}
            >
              clear all
              <FontAwesomeIcon icon={faBroom} />
            </div>
          )}
        </div>
        {reminders.length > 0 && (
          <div className="reminders-list">{reminders}</div>
        )}
      </>
    </>
  );
};

export default ReminderList;
