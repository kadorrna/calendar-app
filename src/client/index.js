const Client = {
  getWeatherInfo: (cityName, shortCountryName) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${shortCountryName}&appid=ce5e2c716e02e7844a6da3ea1ee9edb1`
    ).then((response) => response.json());
  },
};

export default Client;
