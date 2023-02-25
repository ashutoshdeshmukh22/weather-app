// Address -> Lat/Long -> Weather
const request = require('request');

// const url =
//   'http://api.weatherstack.com/current?access_key=4194e957ea41c9255ae2fed88709a50e&query=18.519479,-73.870703';

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to Connect to Weather Service!'); //checking for simple network error / called as low level error
//   } else if (response.body.error) {
//     console.log('Unable to Find Location'); //checking for user input error
//   } else {
//     console.log(
//       `${response.body.current.weather_descriptions[0]} It is Currently ${response.body.current.temperature} degree out. It feels like ${response.body.current.feelslike} degree out`
//     );
//   }
// });

const geocodeURL =
  'http://api.positionstack.com/v1/forward?access_key=0b114b72b3cc5a83c63665a813baaf1d&query=';

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to Connect geocode Service');
  } else if (response.body.error) {
    console.log('Unable To Find GeoCode / Location. TRY AGAIN');
  } else {
    let lat = response.body.data[0].latitude;
    let long = response.body.data[0].longitude;
    console.log(`For Akurdi Latitude is ${lat} and Longitude is ${long} `);
  }
});
