const _ = require('lodash');
const request = require('request');

const getRegion = result => {
  if (!result) {
    return undefined;
  }

  return (_.find(
    result.address_components,
    ac => _.indexOf(ac.types, 'administrative_area_level_1') !== -1
  ) || {}).long_name;
}

const getTimezone = (lat, lon) => {
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
};

const geocodeLocation = (country, locationParts) => {
  return new Promise((resolve, reject) => {
    const cleanLocationParts = _.filter(locationParts, p => !p.match(/^[0-9]+$/i))
    const address = [...cleanLocationParts, country].join(' ');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    request(url, (error, response, body) => {
      const b = JSON.parse(body)

      if (!error && b.status === 'OK') {
        const result = _.first(b.results);
        
        if (!result) {
          resolve();
        } else {
          resolve({
            location: result && result.geometry && result.geometry.location,
            region: getRegion(result),
          });
        }
      } else {
        reject(`Failed geocode lookup for ${address}: ${b} ${typeof b}`)
      }
    });
  });
};


module.exports = {
  getGeoAndTZ: (country, locationParts) => {
    return geocodeLocation(country, locationParts).then(location => {
      if (!location) {
        throw new Error(`Did not geocode for ${country} ${locationParts}`);
      }

      const { lat, lng } = location.location;

      return getTimezone(location.location.lat, location.location.lng).then(timezone => {
        return {
          timezone,
          lat,
          lng,
          region: location.region,
        }
      })
    });
  },
  getTimezone,
  geocodeLocation
}
