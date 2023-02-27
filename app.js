// Address -> Lat/Long -> Weather
const request = require('request');
const geoCode = require('./utils/geoCode');
const forCast = require('./utils/forCast');

const address = process.argv[2];

if (!address) {
  console.log('Please provide address');
} else {
  // The input for forCast comes from the output of geoCode
  geoCode(address, (error, data) => {
    if (error) {
      console.log('Error', error);
    } else {
      forCast(data.latitude, data.longitude, (error, forcastData) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data.location);
          console.log('Data', forcastData);
        }
      });
    }
  });
}
