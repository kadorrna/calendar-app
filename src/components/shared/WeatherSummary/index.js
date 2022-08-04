const Weather = (icon, main) => {
  return (
    <div className="row my-0">
      <div className="col-4">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
      </div>
      <div className="col-4 d-flex align-items-center justify-content-center">
        {main}
      </div>
    </div>
  );
};

const WeatherSummary = ({ icon, main }) => {
  if (icon && main) {
    return Weather(icon, main);
  } else {
    return (
      <div className="col-12 mt-4">
        Weather info not available for this city
      </div>
    );
  }
};

export default WeatherSummary;
