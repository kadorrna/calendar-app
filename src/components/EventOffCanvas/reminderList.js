import useDateReminders from "../../hooks/useDateReminders";

const ReminderList = ({ date }) => {
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
        </div>
      )
    );
  }
  return <div className="reminder-list">{reminders}</div>;
};

export default ReminderList;
