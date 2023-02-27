const request = require('request');

// address -> we pass the address here
// callback -> after getting lat and long we will call this function
const geoCode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=0b114b72b3cc5a83c63665a813baaf1d&query=${address}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to Connect geocode Service', undefined);
    } else if (response.body.data.length === 0) {
      callback('Unable To Find GeoCode / Location. TRY AGAIN', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].name,
      });
    }
  });
};

module.exports = geoCode;
