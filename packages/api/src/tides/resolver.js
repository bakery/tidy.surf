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
        return moment(root.date).tz(spot.timezone).format('LT');
      }
      return moment(root.date).tz(timeZone).format('LT');
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
        prettyTimeLabel: spotTimezone.format('LT'),
      }

      return Tides.getTides(spot.lat, spot.lon).then(allTides => {
        const formattedTides = _.map(allTides, t => Object.assign({}, t, {
          day: moment(t.date).date(),
          month: moment(t.date).month() + 1,
          year: moment(t.date).year(),
          prettyDateTimeLabel: moment(t.date).tz(spot.timezone).format('ddd, MMM D'),
        }));

        const today = _.filter(formattedTides, t => spotTimezone.date() - moment(t.date).tz(spot.timezone).date() === 0);
        // console.log('today', today);
        const tomorrow = _.filter(formattedTides, t => spotTimezone.date() - moment(t.date).tz(spot.timezone).date() === -1);
        // console.log('tomorrow', tomorrow);
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
          allTides: _.filter(formattedTides, t => spotTimezone.date() - moment(t.date).tz(spot.timezone).date() < -1),
          currentTide,
        }

        return { spot, currentTime, tides }
      });
    },
  },
};
