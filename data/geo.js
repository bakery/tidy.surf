const _ = require('lodash');
const request = require('request');

module.exports = {
  getTimezone: (lat, lon) => {
    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=1458000000&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      request(url, (error, response, body) => {
        const b = JSON.parse(body)

        if (!error && b.status === 'OK') {
          resolve(b.timeZoneId);
        } else {
          reject(`Failed tz lookup for ${lat} ${lon}: ${b}`)
        }
      });
    });
  },

  geocodeLocation: (country, locationParts) => {
    return new Promise((resolve, reject) => {
      const address = [...locationParts, country].join(' ');
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      request(url, (error, response, body) => {
        const b = JSON.parse(body)

        if (!error && b.status === 'OK') {
          const result = _.first(b.results);
          resolve(result && result.geometry && result.geometry.location);
        } else {
          reject(`Failed geocode lookup for ${address}: ${b} ${typeof b}`)
        }
      });
    });
  }
}
