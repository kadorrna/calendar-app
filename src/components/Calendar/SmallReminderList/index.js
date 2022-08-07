import useDateReminders from "../../../hooks/useDateReminders";
import "./small-reminder-list.css";

const SmallReminderList = ({ date }) => {
  const { dateReminders } = useDateReminders(date);

  let reminders = [];
  if (dateReminders?.length > 0) {
    dateReminders.map((e) =>
      reminders.push(
        <div
          key={e.time}
          className="small-reminder m-1 text-center"
          style={{ background: e.color }}
        >
          {e.time}
        </div>
      )
    );
  }
  return <div className="reminders-container">{reminders}</div>;
};
export default SmallReminderList;
