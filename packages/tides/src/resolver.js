import Tides from './lib/tides'

export default {
  Query: {
    tides: (root, {lat, lon}) => Tides.getTides(lat, lon),
  },
};
