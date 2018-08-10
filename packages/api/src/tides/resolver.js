import _ from 'lodash';
import moment from 'moment-timezone';
import Tides from './tides';
import Spots from '../spots/data';
import { makeId } from '../lib/helpers';

export default {
  Tide: {
    prettyTimeLabel: (root, args, context, { variableValues }) => {
      const { timeZone, spotId } = variableValues;
      if (spotId) {
        const spot = _.find(Spots, s => spotId === makeId(s));
        return moment(root.date).tz(spot.timezone).format('HH:mm');
      }
      return moment(root.date).tz(timeZone).format('HH:mm');
    }
  },
  Query: {
    tides: (root, { spotId }) => {
      const spot = _.find(Spots, s => spotId === makeId(s));
      if (!spot) {
        return null;
      }

      const spotTimezone = moment().tz(spot.timezone);

      const currentTime = {
        timezone: spot.timezone,
        hours: spotTimezone.hours(),
        minutes: spotTimezone.minutes(),
        prettyTimeLabel: spotTimezone.format('HH:mm'),
      }

      return Tides.getTides(spot.lat, spot.lon).then(allTides => {
        const formattedTides = _.map(allTides, t => Object.assign({}, t, {
          day: moment(t.date).utc().date(),
          month: moment(t.date).utc().month() + 1,
          year: moment(t.date).utc().year(),
        }));

        const today = _.filter(formattedTides, t => spotTimezone.utc().date() - moment(t.date).utc().date() === 0);
        const tomorrow = _.filter(formattedTides, t => spotTimezone.utc().date() - moment(t.date).utc().date() === -1);
        const currentTide = {
          dt: moment().utc().unix(),
        }

        const closestTide = _.minBy(today, t => {
          return Math.abs(t.dt - spotTimezone.unix())
        });

        if (closestTide.dt - spotTimezone.unix() > 0) {
          currentTide.type = closestTide.type === 'High' ? 'Rising' : 'Falling';
        } else {
          currentTide.type = closestTide.type === 'High' ? 'Falling' : 'Rising';
        }

        const tides = {
          today,
          tomorrow,
          allTides: _.filter(formattedTides, t => spotTimezone.utc().date() - moment(t.date).utc().date() < -1),
          currentTide,
        }
        return { spot, currentTime, tides }
      });
    },
  },
};
