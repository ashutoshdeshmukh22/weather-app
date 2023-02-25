const request = require('request');
const url =
  'http://api.positionstack.com/v1/forward?access_key=0b114b72b3cc5a83c63665a813baaf1d&query=Akurdi Pune';

request({ url: url, json: true }, (error, response) => {
  let lat = response.body.data[0].latitude;
  let long = response.body.data[0].longitude;
  console.log(`For Akurdi Latitude is ${lat} and Longitude is ${long} `);
});
