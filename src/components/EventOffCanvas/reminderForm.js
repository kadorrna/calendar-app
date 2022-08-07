import { useState, useRef } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import {
  addReminder,
  removeReminder as removeReminderFromReduxState,
} from "../../features/reminders";

import Client from "../../client";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import useBookedTimes from "../../hooks/useBookedTimes";

import FeedbackError from "../shared/FeedbackError";
import TimeSelectorComponent from "../shared/TimeSelector";
import CitySelector from "../shared/CitySelector";
import ColorPicker from "../shared/ColorPicker";
import WeatherSummary from "../shared/WeatherSummary";

const ReminderForm = ({ date, hideForm, initialFormValues }) => {
  const calendarId = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const [reminderTimeToRemove, setReminderTimeToRemove] = useState(
    initialFormValues.time
  );
  const [isEdit, setIsEdit] = useState(initialFormValues.isEdit);
  const [description, setDescription] = useState(initialFormValues.description);
  const [reminderColor, setReminderColor] = useState(
    initialFormValues.reminderColor
  );
  const [time, setTime] = useState(initialFormValues.time);
  const [country, selectCountry] = useState(initialFormValues.geoLoc.country);
  const [region, selectRegion] = useState(initialFormValues.geoLoc.region);
  const [weather, setWeather] = useState(initialFormValues.weather);
  const [loading, setLoading] = useState(false);
  const { bookedTimes } = useBookedTimes(date);

  const isTimeAlreadyBooked = () => {
    if (!isEdit) {
      return bookedTimes.includes(time);
    } else {
      const aux = bookedTimes.filter((e) => e !== reminderTimeToRemove);
      return aux.includes(time);
    }
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

  const handleSubmit = (values) => {
    if (isEdit) {
      dispatch(
        removeReminderFromReduxState({ calendarId, reminderTimeToRemove })
      );
    }
    const newReminder = {
      time: values.time,
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
    hideForm();
  };

  const resetForm = () => {
    myRef.current.focus();
    setIsEdit(false);
    setDescription("");
    setTime("10:00");
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
        if (isTimeAlreadyBooked()) {
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
        <Form
          onSubmit={handleSubmit}
          className="container justify-content-center"
        >
          <div className="row my-1">
            <Field
              innerRef={myRef}
              placeholder="Description"
              type="text"
              rows="20"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={(values.description = description)}
            />
            <ErrorMessage
              name="description"
              render={(msg) => (
                <FeedbackError testId="description-error" msg={msg} />
              )}
            />
          </div>
          <div className="row justify-content my-4" data-testid="color-picker">
            <ColorPicker
              value={(values.color = reminderColor.hex)}
              handleChange={setReminderColor}
            />
          </div>
          <div className="row my-3" data-testid="time-selector">
            <TimeSelectorComponent
              value={(values.time = time)}
              handleChange={setTime}
              name="time"
            />
            <ErrorMessage
              component="span"
              name="time"
              render={(msg) => <FeedbackError testId="time-error" msg={msg} />}
            />
          </div>
          <div className="row my-3" data-testid="region-selector">
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
            <ErrorMessage
              name="geoLoc"
              render={(msg) => (
                <FeedbackError testId="geoLoc-error" msg={msg} />
              )}
            />

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
            <div className="col-6 text-end">
              <Button
                type="submit"
                disabled={errors.length > 0}
                data-testid="submitButton"
              >
                {isEdit ? "Update reminder" : "Create"}
              </Button>
            </div>
            <div className="col-6 text-start">
              <Button
                type="submit"
                className="btn btn-danger"
                onClick={() => hideForm()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReminderForm;
