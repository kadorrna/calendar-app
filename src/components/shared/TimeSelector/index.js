import TimePicker from "react-time-picker";

import "./timeSelector.css";

const TimeSelectorComponent = ({ value, handleChange }) => {
  return (
    <TimePicker
      onChange={handleChange}
      value={value}
      className="timeSelector formControl"
    />
  );
};

export default TimeSelectorComponent;
