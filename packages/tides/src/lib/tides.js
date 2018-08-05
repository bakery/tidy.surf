import request from 'request-promise-native';
import moment from 'moment-timezone';

export default {
  getTides(lat, lon, apiKey = process.env.WORLD_TIDES) {
    if (!apiKey) {
      throw new Error('WORLD_TIDES api key missing');
    }

    const start = moment.utc().subtract(1, 'days').hour(0).minute(0).second(0).unix();
    
    // 10 days in seconds
    const length = 10 * 24 * 60 * 60;
    const url = `https://www.worldtides.info/api?datum=LAT&extremes&lat=${lat}&lon=${lon}&start=${start}&length=${length}&maxcalls=2&key=${apiKey}`;

    return request(url).then(r => {
      const response = JSON.parse(r);
      if (response && (response.status === 200)) {
        return response.extremes;
      }
    });
  },
};