import { useState } from "react";
import { Form, Formik, Field } from "formik";
import Client from "../../client";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import useReminders from "../../hooks/useReminders";

import ErrorMessage from "../shared/ErrorMessage";
import TimeSelectorComponent from "../shared/TimeSelector";
import CitySelector from "../shared/CitySelector";
import ColorPicker from "../shared/ColorPicker";
import WeatherSummary from "../shared/WeatherSummary";

const ReminderForm = ({ date }) => {
  const [reminderColor, setReminderColor] = useState({ hex: "#dedede" });
  const [reminderTime, setReminderTime] = useState("10:00");
  const [country, selectCountry] = useState("");
  const [region, selectRegion] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);
  const { oldReminders, dateReminders, bookedTimes } = useReminders(date);

  const validDescriptionLength = (str) => {
    const arr = str.split(" ");
    return arr.filter((word) => word !== "").length < 30;
  };

  const getTimeAsNumberOfMinutes = (time) => {
    var timeParts = time.split(":");

    var timeInMinutes = timeParts[0] * 60 + timeParts[1];
    return Number(timeInMinutes);
  };

  const handleSubmit = (values) => {
    const calendarId = `${values.day}-${values.month}-${values.year}`;
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
    let updatedReminders;
    if (oldReminders && oldReminders.length > 0) {
      updatedReminders = oldReminders.map((calendarReminder) => {
        if (calendarReminder.id === calendarId) {
          const newReminders = [
            ...calendarReminder.reminders,
            newReminder,
          ].sort(
            (a, b) =>
              getTimeAsNumberOfMinutes(a.time) -
              getTimeAsNumberOfMinutes(b.time)
          );
          return { ...calendarReminder, reminders: newReminders };
        }
        return calendarReminder;
      });
    } else {
      updatedReminders = [
        {
          id: calendarId,
          reminders: [newReminder],
        },
      ];
    }
    localStorage.setItem(
      "calendar-demo-reminders",
      JSON.stringify(updatedReminders)
    );
  };

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

  return (
    <Formik
      initialValues={{
        description: "",
        color: reminderColor,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        geoLoc: {
          country,
          region,
        },
      }}
      validate={(values) => {
        const errors = {};
        if (!values.description) {
          errors.description = "Description needed";
        } else if (!validDescriptionLength(values.description)) {
          errors.description = "Description can't have more than 30 words";
        }
        if (bookedTimes.includes(values.reminderTime)) {
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
              placeholder="Description"
              type="text"
              rows="20"
              name="description"
              onChange={handleChange}
              value={values.description}
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
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReminderForm;
