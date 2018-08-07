import Tides from './lib/tides'
import moment from 'moment-timezone';

export default {
  Tide: {
    prettyTimeLabel: (root, args, context, { variableValues }) => {
      const { timeZone } = variableValues;
      return moment(root.date).tz(timeZone).format('HH:mm');
    }
  },
  Query: {
    tides: (root, { lat, lon }) => Tides.getTides(lat, lon),
  },
};
