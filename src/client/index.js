const Client = {
  getWeatherInfo: (cityName, shortCountryName) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${shortCountryName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    ).then((response) => response.json());
  },
};

export default Client;
