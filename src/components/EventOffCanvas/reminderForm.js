import { useState } from "react";
import { Formik } from "formik";
import Client from "../../client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import TimeSelectorComponent from "../shared/TimeSelector";
import CitySelector from "../shared/CitySelector";
import ColorPicker from "../shared/ColorPicker";

const useReminders = (date) => {
  const calendarId = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  let oldReminders = localStorage.getItem("calendar-demo-reminders");
  oldReminders = oldReminders ? JSON.parse(oldReminders) : [];
  const dateReminders =
    oldReminders.length > 0
      ? oldReminders.find((e) => e.id === calendarId)?.reminders
      : [];

  const bookedTimes = dateReminders?.map((e) => e.time) || [];

  return { oldReminders, dateReminders, bookedTimes };
};

const ReminderForm = ({ date }) => {
  const [reminderColor, setReminderColor] = useState({ hex: "#dedede" });
  const [reminderTime, setReminderTime] = useState("10:00");
  const [country, selectCountry] = useState("");
  const [region, selectRegion] = useState("");
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
    console.log("values", values);
    const calendarId = `${values.day}-${values.month}-${values.year}`;
    const newReminder = {
      time: values.reminderTime,
      geoLoc: values.geoLoc,
      color: values.color,
      description: values.description,
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
    console.log("country=", country, "value=", value);
    const apiInfo = await Client.getWeatherInfo(value, country);
    console.log("apiInfo", apiInfo);
    selectRegion(value);
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
          errors.description = " Description cant have more than 30 words";
        }
        if (bookedTimes.includes(values.reminderTime)) {
          errors.time = "Time already booked for this day";
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
        <form onSubmit={handleSubmit}>
          <div className="row">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              rows="20"
              name="description"
              onChange={handleChange}
              value={values.description}
            />
            {errors.description && touched.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>
          <div className="row justify-content">
            <ColorPicker
              value={(values.color = reminderColor.hex)}
              handleChange={setReminderColor}
            />
          </div>
          <div className="row">
            <TimeSelectorComponent
              value={(values.reminderTime = reminderTime)}
              handleChange={setReminderTime}
            />
            {errors.time && <span className="error">{errors.time}</span>}
          </div>
          <div className="row">
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
            />
            {errors.geoLoc && touched.geoLoc && (
              <span className="error">{errors.geoLoc}</span>
            )}
          </div>
          <div className="row">
            <Button type="submit" disabled={errors.length > 0}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ReminderForm;
