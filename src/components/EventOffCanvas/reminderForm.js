import { useState, useRef } from "react";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import {
  addReminder,
  removeReminder as removeReminderFromReduxState,
  clearReminders,
} from "../../features/reminders";

import Client from "../../client";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import useBookedTimes from "../../hooks/useBookedTimes";

import ErrorMessage from "../shared/ErrorMessage";
import TimeSelectorComponent from "../shared/TimeSelector";
import CitySelector from "../shared/CitySelector";
import ColorPicker from "../shared/ColorPicker";
import WeatherSummary from "../shared/WeatherSummary";
import ReminderList from "./reminderList";

const ReminderForm = ({ date }) => {
  const calendarId = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const [reminderTimeToRemove, setReminderTimeToRemove] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [reminderColor, setReminderColor] = useState({ hex: "#dedede" });
  const [reminderTime, setReminderTime] = useState("10:00");
  const [country, selectCountry] = useState("");
  const [region, selectRegion] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const { bookedTimes } = useBookedTimes(date);

  const handleRegionChange = async (value) => {
    setLoading(true);
    try {
      const apiInfo = await Client.getWeatherInfo(value, country);
      setWeather(apiInfo.list[0].weather[0]);
    } catch {
      setWeather({});
    }

    selectRegion(value);
    setLoading(false);
  };

  const handleSubmit = (values) => {
    if (isEdit) {
      dispatch(
        removeReminderFromReduxState({ calendarId, reminderTimeToRemove })
      );
    }
    const newReminder = {
      time: values.reminderTime,
      geoLoc: values.geoLoc,
      color: values.color,
      description: values.description,
      weather: {
        icon: weather.icon,
        desc: weather.description,
        main: weather.main,
      },
    };
    dispatch(addReminder({ calendarId, newReminder }));
    resetForm();
  };

  const clearAllReminders = () => {
    dispatch(clearReminders({ calendarId }));
    resetForm();
  };
  const removeReminder = (value) => {
    setReminderTimeToRemove(value.time);
    dispatch(
      removeReminderFromReduxState({ calendarId, reminderTimeToRemove })
    );
    resetForm();
  };

  const editReminder = (value) => {
    myRef.current.focus();
    setIsEdit(true);
    setDescription(value.description);
    setReminderTime(value.time);
    setReminderTimeToRemove(reminderTime);
    selectCountry(value.geoLoc.country);
    selectRegion(value.geoLoc.region);
    setReminderColor({ hex: value.color });
    setWeather(value.weather);
  };

  const resetForm = () => {
    myRef.current.focus();
    setIsEdit(false);
    setDescription("");
    setReminderTime("");
    setReminderTimeToRemove("");
    selectCountry("");
    selectRegion("");
    setReminderColor({ hex: "#dedede" });
    setWeather({});
  };

  return (
    <Formik
      initialValues={{
        description,
        color: reminderColor,
        geoLoc: {
          country,
          region,
        },
      }}
      validate={(values) => {
        const errors = {};
        if (!values.description) {
          errors.description = "Description needed";
        } else if (values.description.length > 30) {
          errors.description = "Description can't have more than 30 chars";
        }
        if (bookedTimes.includes(values.reminderTime) && !isEdit) {
          errors.reminderTime = "Time already booked for this day";
        }
        if (values.geoLoc.country === "" || values.geoLoc.region === "") {
          errors.geoLoc = "Select region and country";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        handleChange,
        touched,
        handleSubmit,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <Field
              innerRef={myRef}
              placeholder="Description"
              type="text"
              rows="20"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={(values.description = description)}
            />
            <ErrorMessage fieldError="description" />
          </div>
          <div className="row justify-content" data-testid="color-picker">
            <ColorPicker
              value={(values.color = reminderColor.hex)}
              handleChange={setReminderColor}
            />
          </div>
          <div className="row" data-testid="time-selector">
            <TimeSelectorComponent
              value={(values.reminderTime = reminderTime)}
              handleChange={setReminderTime}
              name="reminderTime"
            />
            <ErrorMessage fieldError="reminderTime" />
          </div>
          <div className="row" data-testid="region-selector">
            <CitySelector
              value={
                (values.geoLoc = {
                  country,
                  region,
                })
              }
              country={country}
              region={region}
              handleCountryChange={selectCountry}
              handleRegionChange={handleRegionChange}
              name="geoLoc"
            />
            <ErrorMessage fieldError="geoLoc" />

            {weather && !loading && (
              <div className="weather-container">
                <WeatherSummary icon={weather.icon} main={weather.main} />
              </div>
            )}
            {loading && (
              <div className="weather-container d-flex allign-items-center justify-content-center">
                <Spinner animation="grow" className="mt-4" />
              </div>
            )}
          </div>
          <div className="row">
            <Button
              type="submit"
              disabled={errors.length > 0}
              data-testid="submitButton"
            >
              {isEdit ? "Update reminder" : "Add new reminder"}
            </Button>
          </div>
          <ReminderList
            date={date}
            editReminder={editReminder}
            removeReminder={removeReminder}
            clearAllReminders={clearAllReminders}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ReminderForm;
