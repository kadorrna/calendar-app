const Client = {
  // city: () =>
  //   fetch(
  //     `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=ce5e2c716e02e7844a6da3ea1ee9edb1`
  //   ).then((response) => {
  //      const res = response.json()
  //      return{
  //       lat: res.lat,
  //       lon
  //      }
  //   }),

  // https://api.openweathermap.org/data/2.5/forecast?q=Buenos%20Aires,AR&appid=ce5e2c716e02e7844a6da3ea1ee9edb1
  getWeatherInfo: (cityName, shortCountryName) => {
    console.log(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${shortCountryName}&appid=ce5e2c716e02e7844a6da3ea1ee9edb1`
    );
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${shortCountryName}&appid=ce5e2c716e02e7844a6da3ea1ee9edb1`
    ).then((response) => response.json());
  },
};

export default Client;
