const request = require('request');

const forCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4194e957ea41c9255ae2fed88709a50e&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to Connect to Weather Service!', undefined); //checking for simple network error / called as low level error
    } else if (response.body.error) {
      callback('Unable to Find Location', undefined); //checking for user input error
    } else {
      const forCastData = `${response.body.current.weather_descriptions[0]} Throughout the day. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike}`;

      callback(undefined, forCastData);
    }
  });
};

module.exports = forCast;
